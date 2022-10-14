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

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, UntypedFormBuilder, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonButton, IonInput } from '@ionic/angular';

import { GlobalService } from "../global.service";
import { environment } from 'src/environments/environment';

/*
- if no conn. info in local db:
  - apparently user new on this device. ask if has used vodle before
    - if no: ask for new conn. info, try to connect as public user
      - if success, look for private user doc. 
        - if exists, notify that conn. info already in use (used vodle before after all?), try connecting as private user and updating user doc.
          - if success, done
          - otherwise, notify error, ask to verify username and password or contact server admin to correct permissions, return to form
        - otherwise, try generating user
          - if success, try connecting as private user and generating user doc.
            - if success, done
            - otherwise, notify error, ask to verify username and password or contact server admin to correct permissions, return to form
          - if not, notify error, ask to verify username and password or contact server admin to correct permissions, return to form
      - otherwise, notify error, ask to verify conn. info, return to form 
    - if yes: ask for old conn. info or recovery file, ...
*/

// PAGE:

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  E = environment;
  window = window;
  
  // ATTRIBUTES:

  languageFormGroup: UntypedFormGroup;
  emailFormGroup: UntypedFormGroup;
  passwordFormGroup: UntypedFormGroup;
  oldPasswordFormGroup: UntypedFormGroup;

  step: string;

  showing_password: boolean;
  advanced_expanded: boolean;
  terms_expanded = false;
  accept_privacy = false;
  save_password = false;
  
  @ViewChild('input_email', { static: false }) input_email: IonInput;
  @ViewChild('input_new_password', { static: false }) input_new_password: IonInput;
  @ViewChild('input_retype_password', { static: false }) input_retype_password: IonInput;
  @ViewChild('input_old_password', { static: false }) input_old_password: IonInput;
  @ViewChild('dismiss_button', { static: false }) dismiss_button: IonButton;

  // LIFECYCLE:

  ready = false;  
  then_url: string;

  constructor(      
      private router: Router,
      public route: ActivatedRoute,
      public formBuilder: UntypedFormBuilder,
      public translate: TranslateService,
      public G: GlobalService) { 
    this.G.L.entry("LoginPage.constructor");
    this.route.params.subscribe(params => { 
      this.then_url = params['then'];
      const step = this.step = params['step'] || 'start';
      this.G.L.info("LoginPage going to step", step, this.then_url);
      if (['start','language','used_before',
           'fresh_email','old_email','fresh_password','old_password',
           'connected'].includes(step)) {
        this.ready = true;  // here we do not need to wait for DataService since we need no data. 
      }
      if (step == 'connected') {
        // store privacy consent in database:
        this.G.D.setu('consent', 'Yes, I have read the data protection declaration and terms of use. I consent to the processing of my data on user devices and database servers in the described manner, in order to participate in polls. I agree that some of my data will be transmitted to other participants in pseudonymized form. I am aware that my right to have my data deleted is hence constrained insofar as these copies may not be deleted on all user devices. I can revoke this consent by e-mail to privacy@vodle.it.');
      }

    });
  }

  ngOnInit() {
    this.G.L.entry("LoginPage.ngOnInit");
    this.languageFormGroup = this.formBuilder.group({
      language: new UntypedFormControl('', Validators.required),
    });
    this.emailFormGroup = this.formBuilder.group({
      email: new UntypedFormControl('', Validators.compose([
//        Validators.required,  // TODO: uncomment once the problem is solved that the privacy link does not work properly when field left empty
        Validators.email
      ])),
    });
    this.passwordFormGroup = this.formBuilder.group({
      pw: this.formBuilder.group({
        password: new UntypedFormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.G.S.password_regexp)
        ])),
        confirm_password: new UntypedFormControl('', Validators.required),
      }, {
        validators: [this.G.S.passwords_match]
      }),
    });
    this.oldPasswordFormGroup = this.formBuilder.group({
      pw: this.formBuilder.group({
        password: new UntypedFormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.G.S.password_regexp)
        ])),
      }),
    });
  }
  
  ionViewWillEnter() {
    this.G.L.entry("LoginPage.ionViewWillEnter");
    this.G.D.page = this;
  }

  ionViewDidEnter() {
    this.G.L.entry("LoginPage.ionViewDidEnter");
    const default_lang = navigator.language.slice(0,2);
    this.languageFormGroup.get('language').setValue(
      this.G.S.language||((this.translate.langs.includes(default_lang))?default_lang:''));
    // browser might have prefilled fields, so check this:
    /*
    this.set_language();
    this.set_email();
    this.set_password();
    this.set_old_password();
    */
    if (this.G.D.ready && !this.ready) this.onDataReady();
    setTimeout(() => {
      const el = this.input_email||this.input_new_password||this.input_old_password;
      if (el) {
        if (this.step!='fresh_email') el.setFocus();
      } else {
        const el = document.getElementById("dismiss_button");
        if (el) {
          el.focus();
        }
      }
    }, 300);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("LoginPage.onDataReady");
    this.ready = true;
  }

  ionViewDidLeave() {
    this.G.L.entry("LoginPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("LoginPage.ionViewDidLeave");
  }

  // OTHER HOOKS:
  
  // for DataService:

  onDataChange() {
    // called whenever data stored in database has changed
    this.G.L.entry("LoginPage.onDataChange");
  }

  // for form actions:

  set_language() {
    let c = this.languageFormGroup.get('language');
    if (c.valid) this.G.S.language = c.value;
  }

  set_email() {
    let c = this.emailFormGroup.get('email');
    if (c.valid) this.G.S.email = c.value; 
  }

  set_password() {
    let fg = this.passwordFormGroup.get('pw');
    if (fg.valid) this.G.S.password = fg.get('password').value; 
  }

  set_old_password() {
    let fg = this.oldPasswordFormGroup.get('pw');
    if (fg.valid) this.G.S.password = fg.get('password').value; 
  }

  submit_language() {
    this.set_language();
    if (this.languageFormGroup.valid) {
      this.G.go_fullscreen_on_mobile();
      this.router.navigate(['/login/used_before/'+this.then_url]);  
    }
  }

  ask_used_before_no() {
    this.G.go_fullscreen_on_mobile();
    this.router.navigate(['/login/fresh_email/'+this.then_url]);
  }

  ask_used_before_yes() {
    this.G.go_fullscreen_on_mobile();
    this.router.navigate(['/login/old_email/'+this.then_url]);
  }

  submit_email() {
    this.set_email();
    if (this.emailFormGroup.get('email').valid && this.accept_privacy) {
      if (this.step == 'fresh_email') {
        this.router.navigate(['/login/fresh_password/'+this.then_url]);
      } else {
        this.router.navigate(['/login/old_password/'+this.then_url]);
      }
    }
  }

  login_as_guest() {
    this.G.S.password = "Guest" + Math.round(Math.random()*1000000);
    this.G.S.email = this.G.S.password + "@vodle.it";
    this.G.S.default_wap = 10;
    this.G.S.use_guest = true;
    this.G.D.login_submitted();
  }

  blur_password() {
    setTimeout(() => {
      this.input_retype_password.setFocus();
    }, 100);
  }

  submit_new_password() {
    this.set_password();
    // TODO: test connection to vodle central. if fails, ask for different server or correct password?
    if (this.passwordFormGroup.get('pw').valid) {
      this.G.S.default_wap = 10;
      this.G.D.login_submitted();
    }
  }

  submit_old_password() {
    this.set_old_password();
    // TODO: test connection to vodle central. if fails, ask for different server or correct password!
    if (this.oldPasswordFormGroup.get('pw').valid) {
      this.G.D.login_submitted();
    }
  }

  connected_dismissed() {
    this.G.D.init_notifications(true);
    const target = "./#/"+decodeURIComponent(((!!this.then_url) && !this.then_url.includes('logout')) ? this.then_url : "");
    this.G.L.trace("LoginPage redirecting to", this.then_url, target);
    if (target != "") {
      // DIRTY FIX to make sure data is loaded properly:
      window.location.replace(target);
    } else {
      // in principle, we would rather want to do this instead:
      this.router.navigate([target]);
    }
  }

}
