/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

/*
TODO:
- fix next field not showing in android app
- fix wrong option_stage when returning, make "skip" button work properly
- make tab key autofocus work properly
*/

import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

import { PopoverController, IonSelect, IonToggle, AlertController, IonInput, IonDatetime } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';

import { DraftpollKebapPage } from '../draftpoll-kebap/draftpoll-kebap.module';  

import { GlobalService } from "../global.service";
import { Poll, Option } from "../poll.service";
import { SelectServerComponent } from '../sharedcomponents/select-server/select-server.component';
import { environment } from 'src/environments/environment';

import { unique_name_validator$ } from '../sharedcomponents/unique-form-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

type option_data_t = { oid?, name?, desc?, url?, ratings? };

function is_forward_key(ev: KeyboardEvent) {
  return (ev.key == "Tab" || ev.key == "Enter") && !ev.ctrlKey && !ev.shiftKey && !ev.metaKey && !ev.altKey;
}

@Component({
  selector: 'app-draftpoll',
  templateUrl: './draftpoll.page.html',
  styleUrls: ['./draftpoll.page.scss'],
})
export class DraftpollPage implements OnInit {

  E = environment;
  
  // page template elements:
  
  @ViewChild(IonSelect, { static: false, read: ElementRef }) type_select_ref: ElementRef;
  @ViewChild(IonSelect, { static: false }) type_select: IonSelect;
  @ViewChild(IonSelect, { static: false }) due_select: IonSelect;
  @ViewChild(SelectServerComponent, { static: false }) select_server: SelectServerComponent;
  @ViewChild(IonToggle, { static: false }) detailstoggle: IonToggle;
  @ViewChildren(IonSelect) ionSelects: QueryList<IonSelect>;

  // form:

  formGroup: UntypedFormGroup;
  stage: number
  option_stage: number;
  expanded: Array<boolean>;
  advanced_expanded: boolean;
  deleted: boolean;

  // draft poll data:

  pd: { 
    pid?,
    is_test?,
    type?, language?, 
    title?, desc?, url?, 
    due_type?, due_custom?, 
    db?, db_from_pid?, db_custom_server_url?, db_custom_password?,
    options?: option_data_t[] 
  };
  get n_options() { return (this.pd.options||[]).length; }

  // objects:

  pid: string;

  // other:

  max = Math.max; // function used frequently in template

  // LIFECYCLE:

  show_details = false;
  ready = false;  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: UntypedFormBuilder, 
    private popover: PopoverController,
    public alertCtrl: AlertController,
    public G: GlobalService,
    public translate: TranslateService,
    private ref: ChangeDetectorRef
  ) { 
    this.G.L.entry("DraftpollPage.constructor");
    this.route.params.subscribe( params => { 
      this.pid = params['pid'];
      this.pd = JSON.parse(decodeURIComponent(params['pd']||"{}"));
    } );
  }
  
  ngOnInit() {
    this.G.L.entry("DraftpollPage.ngOnInit");
    this.reset();
  }

  ionViewWillEnter() {
    this.G.L.entry("DraftpollPage.ionViewWillEnter");
    this.G.D.page = this;
    this.reset();
  }

  ionViewDidEnter() {
    this.G.L.entry("DraftpollPage.ionViewDidEnter");
    if (this.G.D.ready && !this.ready) this.onDataReady();
  }

  onDataReady() {
    this.G.L.entry("DraftpollPage.onDataReady");
    this.deleted = false;
    if (!this.pid) {
      this.stage = 0;
      if (!this.pd) {
        this.G.L.info("DraftpollPage editing new draft");
        this.pd = { db:'default' };
      } else {
        this.G.L.info("DraftpollPage editing draft with data", this.pd);
        this.pd.due_custom = (this.pd.due_custom||'')!=''?(new Date(this.pd.due_custom)):null;
        this.pd.db = this.pd.db||'default';
      }
    } else if (this.pid in this.G.P.polls) {
      if (this.G.P.polls[this.pid].state == 'draft') {
        this.G.L.info("DraftpollPage editing existing draft", this.pid);
        // read data:
        let p = this.G.P.polls[this.pid];
        this.pd = { 
          pid:p.pid,
          type:p.type, language:p.language,
          title:p.title, desc:p.desc, url:p.url, 
          due_type:p.due_type, due_custom:p.due_custom, 
          db:p.db, db_from_pid:p.db_from_pid, db_custom_server_url:p.db_custom_server_url, db_custom_password:p.db_custom_password,
          options: [] 
        };
        this.stage = !(!!p.due_custom)?6:p.due_type?6:p.url!=''?4:p.desc!=''?3:p.title!=''?4:p.type?1:0;
        for (let [oid, o] of Object.entries(p.options)) {
          this.pd.options.push({ oid:oid, name:o.name, desc:o.desc, url:o.url });
          this.stage = 6;
          this.option_stage = 10;
        }
      } else {
        this.G.L.warn("DraftpollPage non-draft pid ignored, generating new draft");
      }
    } else {
      this.G.L.warn("DraftpollPage unknown pid ignored, generating new draft");
    }
    this.expanded = Array<boolean>(this.n_options);
    this.advanced_expanded = false;
    // fill form:
    if (this.pd) {
      this.formGroup.setValue({ 
        poll_type: this.pd.type||'',
        poll_language: (this.pd.language||'')!=''?this.pd.language:this.G.S.language,
        poll_title: this.pd.title||'', 
        poll_desc: this.pd.desc||'',
        poll_url: this.pd.url||'', 
        poll_due_type: this.pd.due_type||'', 
        poll_due_custom: (!this.pd.due_custom)?'':this.pd.due_custom.toISOString(),
      });
      if (this.pd.language||this.pd.db_from_pid||this.pd.db_custom_server_url) {
        this.advanced_expanded = true;
      }
      if (this.pd.desc||this.pd.url) {
        this.show_details = true;
      }
      if (!this.pd.options) {
        this.pd.options = [];
      }
      for (let [i, od] of this.pd.options.entries()) {
        this.add_option_inputs(i);
        this.formGroup.get('option_name'+i).setValue(od.name); 
        this.formGroup.get('option_desc'+i).setValue(od.desc); 
        this.formGroup.get('option_url'+i).setValue(od.url); 
        this.stage = 6;
        this.option_stage = 10;
        if (od.desc||od.url) {
          this.show_details = true;
        }
      }
    }
    if (this.n_options==0) {
      this.add_option({});
      this.option_stage = 0;
    }
    // show the page:
    this.ready = true;
    // find select-server component and register us with it:
    this.ref.detectChanges();
    // make sure select-element values are translated properly:
    this.ionSelects.map((select) => select.value = select.value);
    // open the type selector?:
    if (!this.formGroup.get('poll_type').value) {
      this.type_select.open(new MouseEvent("click"));
    }
  }

  onSelectServerReady(select_server:SelectServerComponent) {
    // called by SelectServerComponent is ready
    this.select_server = select_server;
    if (this.pd) {
      this.select_server.selectServerFormGroup.setValue({
        db: this.pd.db||'',
        db_from_pid: this.pd.db_from_pid||'',
        db_custom_server_url: this.pd.db_custom_server_url||'',
        db_custom_password: this.pd.db_custom_password||'',
      });
    }
  }

  ionViewWillLeave() {
    this.G.L.entry("DraftpollPage.ionViewWillLeave");
    // TODO: close/dismiss this.type_select, which is a popover
    if ((this.pd.title||'')=='') {
      this.G.L.info("DraftpollPage.ionViewWillLeave not saving empty title draft");
      // TODO: notify of deleted draft
    } else if (!this.deleted) {
      this.G.L.info("DraftpollPage.ionViewWillLeave saving draft");
      var p;
      if (!this.pid) {
        this.pid = (this.pd.is_test == true ? 'TEST_' : '') + this.G.P.generate_pid();
      }
      if (!(this.pid in this.G.P.polls)) {
        // generate new poll object:
        p = new Poll(this.G, this.pid);
      } else {
        p = this.G.P.polls[this.pid];
      }
      p.state = 'draft';
      if (this.pd.is_test == true) {
        p.is_test = true;
      }
      p.type = this.pd.type;
      p.language = this.pd.language;
      p.title = this.pd.title;
      p.desc = this.pd.desc;
      p.url = this.pd.url;
      p.due_type = this.pd.due_type;
      p.due_custom = this.pd.due_custom;
      p.set_due();
      p.db = this.pd.db;
      p.db_from_pid = this.pd.db_from_pid;
      p.db_custom_server_url = this.pd.db_custom_server_url;
      p.db_custom_password = this.pd.db_custom_password;
      let oids = [];
      for (let od of this.pd.options) {
        this.G.L.trace(" storing option data", od);
        if ((od.name||'')!='') {
          var o: Option;
          if (!od.oid) {
            od.oid = this.G.P.generate_oid(this.pid);
            this.G.L.trace("  generated new oid", od.oid);
          }
          if (!(od.oid in p.options)) {
            // generate new options object:
            this.G.L.trace("  creating new Option object");
            o = new Option(this.G, p, od.oid, od.name, od.desc, od.url);
          } else {
            o = p.options[od.oid];
            this.G.L.trace("  reusing Option object", o);
            o.name = od.name;
            o.desc = od.desc;
            o.url = od.url;
          }
          oids.push(od.oid);
          if (p.is_test && !!od.ratings) {
            // mark poll as test poll and store ratings of simulated voters:
            this.G.D.setp(this.pid, 'simulated_ratings.'+od.oid, JSON.stringify(od.ratings));
          }
        }
      }
      this.G.L.trace(" oids now", oids);
      // remove deleted options from p:
      for (let [oid, o] of Object.entries(p.options)) {
        if (!oids.includes(oid)) {
          this.G.L.trace(" removing old option", oid);
          p.remove_option(oid);
        }
      }
      // send local notification:
      LocalNotifications.schedule({
        notifications: [{
          title: this.translate.instant("draftpoll.notification-saved-title"),
          body: p.title,
          id: 1 // TODO: increment or leave out?
        }]
      })
      .then(res => {
        this.G.L.trace("DraftpollPage.ionViewWillLeave localNotifications.schedule succeeded:", res);
      }).catch(err => {
        this.G.L.warn("DraftpollPage.ionViewWillLeave localNotifications.schedule failed:", err);
      });
    }
    this.G.L.trace("DraftpollPage.ionViewWillLeave D.pids:", [...this.G.D.pids]);
    this.G.L.exit("DraftpollPage.ionViewWillLeave");
  }

  ionViewDidLeave() {
    this.G.L.entry("DraftpollPage.ionViewDidLeave");
    this.G.D.save_state();
    this.ready = false; // so that when returning, onDataReady will again be triggered
    this.G.L.exit("DraftpollPage.ionViewDidLeave");
  }

  // OTHER HOOKS:

  // for DataService:

  onDataChange() {
    // called whenever data stored in database has changed
    this.G.L.entry("DraftpollPage.onDataChange");
    // TODO: what?
  }

  // for form actions:

  set_poll_type() {
    let c = this.formGroup.get('poll_type');
    if (c.valid) this.pd.type = c.value;
  }

  set_poll_language() {
    let c = this.formGroup.get('poll_language');
    if (c.valid) this.pd.language = c.value;
  }

  set_poll_title() {
    let c = this.formGroup.get('poll_title');
    if (c.valid) this.pd.title = c.value;
  }

  set_poll_desc() {
    let c = this.formGroup.get('poll_desc');
    if (c.valid) this.pd.desc = c.value;
  }

  set_poll_url() {
    let c = this.formGroup.get('poll_url');
    if (c.valid) this.pd.url = c.value;
  }

  set_poll_due_type() {
    let c = this.formGroup.get('poll_due_type');
    if (c.valid) this.pd.due_type = c.value;
  }

  set_poll_due_custom() {
    this.G.P.update_ref_date();
    let c = this.formGroup.get('poll_due_custom');
    if (c.valid) this.pd.due_custom = new Date(c.value);
  }

  set_option_name(i: number) {
    let c = this.formGroup.get('option_name'+i);
    this.G.L.trace("set_option_name",i,c.value);
    if (c.valid) this.pd.options[i].name = c.value;
    this.G.L.trace("set_option_name result",this.pd.options,this.pd.options[i]);
  }

  set_option_desc(i: number) {
    let c = this.formGroup.get('option_desc'+i);
    if (c.valid) this.pd.options[i].desc = c.value;
  }

  set_option_url(i: number) {
    let c = this.formGroup.get('option_url'+i);
    if (c.valid) this.pd.options[i].url = c.value;
  }

  // selectServer component hooks:

  set_db(value: string) {
    this.pd.db = value;
  }

  set_db_from_pid(value: string) {
    this.pd.db_from_pid = value;
  }

  set_db_custom_server_url(value: string) {
    this.pd.db_custom_server_url = value;
  }

  set_db_custom_password(value: string) {
    this.pd.db_custom_password = value;
  }

  // focus management:

  set_focus(input_element_id: string) {
    /** set the focus to a certain IonInput element after 100 ms */
    setTimeout(() => {
      const next_input_element = <IonInput><unknown>document.getElementById(input_element_id);
      if (!!next_input_element) {
        next_input_element.setFocus();
      }
    }, 100);  
  }

  open_due_select() {
    // TODO: find a way to open it so that the title is still visible. 
    /**/
    setTimeout(() => {
      (<IonSelect><unknown>document.getElementById('due_select')).open(new MouseEvent("click"));
    }, 100);
    /**/
  }

  open_due_custom() {
    setTimeout(() => {
// FIXME:      (<IonDatetime><unknown>document.getElementById('poll_due_custom')).open();
    }, 100);
  }

  changed_poll_type() {
    if (this.stage < 1) {
      this.stage = Math.max(this.stage, 1);    
      this.set_focus('input_poll_title');  
    }
  }

  blur_poll_title() {
    if (!this.formGroup.get('poll_title').valid) {
      this.set_focus('input_poll_title');
    }
  }

  poll_title_onKeydown(ev: KeyboardEvent) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('poll_title').valid) {
        if (this.stage < 2) {
          this.stage = this.show_details ? 2 : 4;
        }
        if (this.show_details) {
          this.set_focus('input_poll_desc');
        } else {
          this.open_due_select();
        }
      } else {
        this.set_focus('input_poll_title');
      }  
    }
  }

  blur_poll_desc() {
  }

  poll_desc_onKeydown(ev: KeyboardEvent) {
    if (is_forward_key(ev)) {
      if (this.stage < 3) {
        this.stage = 3;
        this.set_focus('input_poll_url');  
      }  
    }
  }

  blur_poll_url() {
    if (!this.formGroup.get('poll_url').valid) {
      this.set_focus('input_poll_url');
    }
  }

  poll_url_onKeydown(ev: KeyboardEvent) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('poll_url').valid) {
        if (this.stage < 4) {
          this.stage = Math.max(this.stage, 4);
        }
        this.open_due_select(); // TODO: open select for due type      
      } else {
        this.set_focus('input_poll_url');
      }  
    }
  }

  changed_due_type() {
    if (this.stage < 5) {
      if (this.formGroup.get('poll_due_type').value == 'custom') {
        this.stage = 5;
        this.open_due_custom();
      } else {
        this.stage = 6;
        this.set_focus('input_option_name0');
      }
    }
  }

  changed_poll_due_custom() {
    if (this.formGroup.get('poll_due_custom').valid) {
      if (this.stage < 6) {
        this.stage = 6;
        this.set_focus('input_option_name0');
      }  
    }
  }

  blur_option_name(i: number) {
    if (!this.formGroup.get('option_name'+i).valid) {
      this.set_focus('input_option_name'+i);
    }
  }

  option_name_onKeydown(ev: KeyboardEvent, i: number, show_details: boolean) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('option_name'+i).valid) {
        if (show_details) {
          this.option_stage = this.max(this.option_stage, 1);
          this.expanded[i] = true;
          this.set_focus('input_option_desc'+i);
        } else if (i == this.n_options - 1) {
          this.next_option(i);
        }
      } else {
        this.set_focus('input_option_name'+i);
      }  
    }
  }

  blur_option_desc(i: number) {
    if (!this.formGroup.get('option_desc'+i).valid) {
      this.set_focus('input_option_desc'+i);
    }
  }

  option_desc_onKeydown(ev: KeyboardEvent, i: number) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('option_desc'+i).valid) {
        this.option_stage = Math.max(this.option_stage, 2);
        this.set_focus('input_option_url'+i);
      } else {
        this.set_focus('input_option_desc'+i);
      }  
    }
  }

  blur_option_url(i: number) {
    if (!this.formGroup.get('option_url'+i).valid) {
      this.set_focus('input_option_url'+i);
    }
  }
  
  option_url_onKeydown(ev: KeyboardEvent, i: number) {
    if (is_forward_key(ev)) {
      if (this.formGroup.get('option_url'+i).valid) {
        if (i == this.n_options - 1) {
          this.next_option(i);
        } else {
          this.set_focus('input_option_name'+(i+1));
        }
      } else {
        this.set_focus('input_option_url'+i);
      }  
    }
  }

  next_option(i: number) {
    this.option_stage = this.max(this.option_stage, 3);
    this.expanded[i] = false;
    this.add_option({});
    this.set_focus('input_option_name'+(i+1));
  }

  async del_poll_dialog() { 
    const confirm = await this.alertCtrl.create({ 
      message: this.translate.instant(
        "draftpoll.del-poll-confirm-question"), 
      buttons: [
        { 
          text: this.translate.instant('cancel'), 
          role: 'Cancel',
          handler: () => { 
            console.log('Confirm Cancel.');  
          } 
        },
        { 
          text: this.translate.instant('OK'),
          role: 'Ok', 
          handler: () => {
            this.del_draft();
          } 
        } 
      ] 
    }); 
    await confirm.present(); 
  } 

  async del_option_dialog(i: number) { 
    const confirm = await this.alertCtrl.create({ 
      message: this.translate.instant(
        this.formGroup.get('poll_type').value == 'choice' 
          ? "draftpoll.del-option-confirm-question" 
          : "draftpoll.del-target-confirm-question", 
        { name: this.formGroup.get('option_name'+i).value }), 
      buttons: [
        { 
          text: this.translate.instant('cancel'), 
          role: 'Cancel',
          handler: () => { 
            console.log('Confirm Cancel.');  
          } 
        },
        { 
          text: this.translate.instant('OK'),
          role: 'Ok', 
          handler: () => {
            this.del_option(i);
          } 
        } 
      ] 
    }); 
    await confirm.present(); 
  } 

  no_more() {
    if ((this.formGroup.get('option_name'+(this.n_options-1)).value||'')=='') {
      this.option_stage = 10;
      this.del_option(this.n_options-1);
    }
  }

  new_option() {
    this.option_stage = 0;
    this.add_option({});
  }
  
  // kebap:

  showkebap(event: Event) {
    this.popover.create({
        event, 
        component: DraftpollKebapPage, 
        translucent: true,
        showBackdrop: false,
        cssClass: 'kebap',
        componentProps: {parent: this}
      })
      .then((popoverElement)=>{
        popoverElement.present();
      })
  }

  send4review() { 
    this.G.L.warn("DraftpollPage.send4review not yet implemented!");
  }

  async import_csv_dialog() { 
    const confirm = await this.alertCtrl.create({ 
      header: this.translate.instant('draftpoll.import-options-header'), 
      message: this.translate.instant("draftpoll.import-options-msg"), 
      buttons: [
        { 
          text: this.translate.instant('cancel'), 
          role: 'Cancel',
          handler: () => { 
            console.log('Confirm Cancel.');  
          } 
        },
        { 
          text: this.translate.instant('choose-file'),
          role: 'Ok', 
          handler: () => {
            // open the file chooser by simulating a click to the hidden form field:
            document.getElementById("choosefile").click();
          } 
        } 
      ] 
    }); 
    await confirm.present(); 
  } 

  // ready button:

  ready_button_clicked() {
    this.formGroup.get('poll_due_custom').updateValueAndValidity();
    if (this.formGroup.valid) {
      if (!this.pid) {
        this.pid = (this.pd.is_test == true ? 'TEST_' : '') + this.G.P.generate_pid();
      }
      this.router.navigate(['/previewpoll/'+this.pid]);
    }
  }

  // OTHER METHODS:

  private reset() {
    this.formGroup = this.formBuilder.group({
      poll_type: new UntypedFormControl('', Validators.required),
      poll_language: new UntypedFormControl(''),
      poll_title: new UntypedFormControl('', Validators.required),
      poll_desc: new UntypedFormControl(''),
      poll_url: new UntypedFormControl('', Validators.pattern(this.G.urlRegex)),
      poll_due_type: new UntypedFormControl('', Validators.required),
      poll_due_custom: new UntypedFormControl('', this.allowed_date.bind(this)),
    });
    this.G.P.update_ref_date();
  }

  private del_draft() {
    // TODO!
    if (this.pid) {
      this.G.P.polls[this.pid].delete();
    }
    this.deleted = true;
    this.router.navigate(["/mypolls"]);
  }

  import_csv(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    const page = this;
    reader.onload = function (event) {
      const content = event.target.result as string;
      for (var row of content.split("\n")) {
        // TODO: improve csv parser!
        var cols = row.split(/\s*"\s*,\s*"\s*/);
        if (cols.length>0) {
          cols[0] = cols[0].slice(cols[0].indexOf('"')+1);
          cols[cols.length-1] = cols[cols.length-1].slice(0, cols[cols.length-1].indexOf('"'));
          cols = cols.map(c => c.trim());
          if (cols[0] != "") {
            page.no_more();
            if (cols.length==1) { 
              page.add_option({ name:cols[0] });
            } else if (cols.length==2) { 
              page.add_option({ name:cols[0], desc:cols[1] });
              page.detailstoggle.checked = true;
            } else { 
              page.add_option({ name:cols[0], desc:cols[1], url:cols[2]}); 
              page.detailstoggle.checked = true;
            }
            page.stage = 10;
            page.option_stage = 10;
          }
        }
      }
    }
    reader.readAsText(file);
  }

  restart_with_data(spec: string) {
    this.G.L.info("DraftpollPage.restart_with_data", spec);
    this.router.navigate(['/draftpoll/use/'+encodeURIComponent(spec)]);
  }

  private add_option(od: option_data_t) {
    let i = this.n_options;
    this.pd.options.push(od);
    this.add_option_inputs(i);
    this.formGroup.get('option_name'+i).setValue(od.name); 
    this.formGroup.get('option_desc'+i).setValue(od.desc); 
    this.formGroup.get('option_url'+i).setValue(od.url); 
  }

  private add_option_inputs(i:number) {
    this.formGroup.addControl('option_name' + i, new UntypedFormControl("", [Validators.required], [unique_name_validator$(this.existingOptionName$( 'option_name' + i))]));
    this.formGroup.addControl('option_desc'+i, new UntypedFormControl(""));
    this.formGroup.addControl('option_url'+i, new UntypedFormControl("", Validators.pattern(this.G.urlRegex)));
    this.option_stage = 0;
  }
  
  private del_option(i: number) {
    // move metadata of options i+1,i+2,... back one slot to i,i+1,...:
    for (let j=i+1; j<this.n_options; j++) {
      this.formGroup.get('option_name'+(j-1)).setValue(this.formGroup.get('option_name'+j).value); 
      this.formGroup.get('option_desc'+(j-1)).setValue(this.formGroup.get('option_desc'+j).value); 
      this.formGroup.get('option_url'+(j-1)).setValue(this.formGroup.get('option_url'+j).value); 
      this.pd.options[j-1] = this.pd.options[j];
    }
    // remove last:
    let j = this.n_options-1;
    this.formGroup.removeControl('option_name'+j);
    this.formGroup.removeControl('option_desc'+j);
    this.formGroup.removeControl('option_url'+j);
    this.pd.options.pop();
  }

  now() { return new Date(); }

  private allowed_date(control: AbstractControl): ValidationErrors | null {
    if (control && control.value) {
      const value = new Date(control.value);
      // check whether in past:
      if (this.G.P.ref_date >= value)
      {
          return {past: true};
      }
      // check whether too far in future:
      if (this.get_max_due() < value)
      {
          return {too_late: true};
      }
      return null;
    }
  }

  get_max_due() {
    const last = new Date(this.G.P.ref_date.valueOf());
    last.setDate(last.getDate() + this.E.polls.max_duration_days);
    return last;
  }

  // CONSTANTS:

  validation_messages = {
    'poll_type': [
      { type: 'required', message: 'validation.poll-type-required' },
    ],
    'poll_language': [
    ],
    'poll_title': [
      { type: 'required', message: 'validation.poll-title-required' },
    ],
    'poll_desc': [
    ],
    'poll_url': [
      { type: 'pattern', message: 'validation.poll-url-valid' },
    ],
    'poll_due_type': [
      { type: 'required', message: 'validation.poll-due-type-required' },
    ],
    'poll_due_custom': [
      { message: 'validation.poll-due-future' },
    ],
    'option_name': [
      { type: 'required', message: 'validation.option-name-required' },
      { type: 'not_unique', message: 'validation.option-name-unique' },
    ],
    'option_desc': [
    ],
    'option_url': [
      { type: 'pattern', message: 'validation.option-url-valid' },
    ],
  }

  existingOptionName$(currentControlName: string): Observable<string[]> {
    return this.formGroup.valueChanges.pipe(
      map(values => {
        const optionNameKeys = Object.keys(values as Object).filter(k => { return k.includes('option_name') && k !== currentControlName })
        const existingOptionNames: string[] = [];
        optionNameKeys.forEach(key => existingOptionNames.push(values[key]));
        return existingOptionNames;
      })
    )
  }

  
}
