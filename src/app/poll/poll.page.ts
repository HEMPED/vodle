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

import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, IonContent, IonRouterOutlet, PopoverController, AlertController, ModalController } from '@ionic/angular'; 

import { environment } from '../../environments/environment';
import { GlobalService } from "../global.service";
import { Poll } from '../poll.service';
import { news_t } from '../data.service';

import { DelegationDialogPage } from '../delegation-dialog/delegation-dialog.module';  
import { DelegationDialogWeightedPage } from '../delegation-dialog-weighted/delegation-dialog-weighted.page';
import { DelegationDialogRankedPage } from '../delegation-dialog-ranked/delegation-dialog-ranked.module';
import { DelegationDialogDifferentPage } from '../delegation-dialog-different/delegation-dialog-different.module';
import { AssistPage } from '../assist/assist.module';  
import { AnalysisPage } from '../analysis/analysis.module';  
import { AddoptionDialogPage } from '../addoption-dialog/addoption-dialog.module';  
import { ExplainApprovalPage } from '../explain-approval/explain-approval.module';  
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.page.html',
  styleUrls: ['./poll.page.scss'],
})
export class PollPage implements OnInit {

  Array = Array;
  Math = Math;
  Object = Object;
  window = window;
  E = environment;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  page = "poll";

  pid: string;
  p: Poll;

  delegate: string;
  delegation_status = "none";
  option_delegated: Map<string, string> = null;

  have_been_delegated = false;
  n_indirect_clients = 1;
  accepted_requests = [];
  declined_requests = [];

  oidsorted: string[] = [];
  sortingcounter: number = 0;

  approved = {}; // whether option is approved by me
  votedfor = null; // oid my prob. share goes to

  // gui layout choices by user:
  show_live = false;
  final_expanded = false;
  details_expanded = true;
  incoming_delegation_expanded = false;
  option_expanded = {};

  // other:

  pieradius = 20;
  two_pi = 2*Math.PI; 
  slidercolor = {};

  refresh_paused = false;
  needs_refresh = false;

  scroll_position = 0;
  rate_yourself_toggle: Record<string, boolean> = {};
  n_delegated = 0;

  news: Set<news_t> = new Set();

  // type of delegation:
  ranked_delegation_allowed = false;
  weighted_delegation_allowed = false;
  different_delegation_allowed = false;

  // LIFECYCLE:

  ready = false;  

  constructor(
      private changeDetector: ChangeDetectorRef,
      private router: Router,
      private route: ActivatedRoute,
      private routerOutlet: IonRouterOutlet,
      public loadingController: LoadingController,
      public alertCtrl: AlertController,
      private popover: PopoverController,
      private modalController: ModalController,
      public translate: TranslateService,
      public G: GlobalService) {
    this.G.L.entry("PollsPage.constructor");
    // get pid of opened poll:
    this.route.params.subscribe( params => { 
      this.pid = params['pid'];
    } );
  }

  ngOnInit() {
    this.G.L.entry("PollsPage.ngOnInit");
  }

  ionViewWillEnter() {
    this.G.L.entry("PollPage.ionViewWillEnter");
    this.G.D.page = this;
    const f = (ev => { this.changeDetector.detectChanges(); });
    window.addEventListener('offline', f);
    window.addEventListener('online', f);
    // get gui state:
    const specs = JSON.parse(this.G.D.getp(this.pid, "poll_page") || "{}");
    this.show_live = (specs['show_live'] == true);
    this.details_expanded = (specs['details_expanded'] != false);
    this.incoming_delegation_expanded = (specs['incoming_delegation_expanded'] == true);
    this.option_expanded = specs['option_expanded'] || {};
    this.G.L.exit("PollPage.ionViewWillEnter", specs);
  }

  ionViewDidEnter() {
    this.G.L.entry("PollPage.ionViewDidEnter");
    if (this.G.D.ready) {
      this.onDataReady();
    }
    this.G.L.debug("PollPage.ready:", this.ready);
  }

  onDataReady() {
    // called when DataService initialization was slower than view initialization
    this.G.L.entry("PollPage.onDataReady");
    if (this.pid in this.G.P.polls) {
      this.p = this.G.P.polls[this.pid];
      if (this.p.state == 'draft') {
        this.G.L.error("PollPage not showing draft poll, redirecting to mypolls page", this.pid);
        this.router.navigate(["/mypolls"]);
      } else {
        this.G.L.info("PollPage showing poll", this.pid);
      }
      // TODO: check if running or closed!
    } else {
      this.G.L.warn("PollPage unknown pid ignored, redirecting to mypolls page", this.pid, this.G.P.polls);
      this.router.navigate(["/mypolls"]);
      return;
    }
    if (this.p.allow_voting) {
      this.G.L.info("PollPage checking if default waps are needed", this.pid);
      for (let oid of this.p.oids) {
        const orm = this.p.own_ratings_map.get(oid);
        if (!orm.has(this.p.myvid)) {
          this.G.L.info("PollPage setting default wap", this.pid, oid, this.G.S.default_wap);
          this.p.set_my_own_rating(oid, this.G.S.default_wap, true);
        }
      }  
    }
    this.update_vote_maps();
    this.p.tally_all();
    // TODO: optimize sorting performance:
    this.oidsorted = [...this.p.T.oids_descending]; 
    this.ready = true;
    this.update_order(true);
    /*
    for (let oid of this.oidsorted) {
      this.option_expanded[oid] = false;
    }
    */
    window.setTimeout(() => {
      this.update_order.bind(this)(true);
      this.show_stats.bind(this)();
    }, 200);
    this.update_delegation_info();
    this.on_delegate_toggle_change();
    this.p.have_seen = true;
    if (this.p.has_results) {
      this.p.have_seen_results = true;
    }

    // get type of delegation:
    this.ranked_delegation_allowed = this.G.D.get_ranked_delegation_allowed(this.pid);
    this.weighted_delegation_allowed = this.G.D.get_weighted_delegation_allowed(this.pid);
    this.different_delegation_allowed = this.G.D.get_different_delegation_allowed(this.pid);

    this.G.L.exit("PollPage.onDataReady");
  }

  onDataChange() {
    this.G.L.entry("PollPage.onDataChangeshared");
    this.G.L.entry("PollPage.onDataChange");
    this.p.tally_all();
    this.update_order();
    this.have_been_delegated = this.p.have_been_delegated(this.p.myvid, this.accepted_requests);
    this.update_delegation_info();
    this.news = this.G.N.filter({pid: this.pid});
    this.update_vote_maps();
    this.changeDetector.detectChanges();

    this.G.L.exit("PollPage.onDataChange");
  }

  ionViewWillLeave() {
    if (this.p.has_results) {
      // register that results have been seen:
      this.p.have_seen_results = true;
    }
    // make sure current slider values are really stored in database:
    for (let oid of this.oidsorted) {
      if (!this.delegate || this.rate_yourself_toggle[oid]
        || (this.get_different_delegation_allowed() && (this.option_delegated.get(oid) == '' || this.option_delegated.get(oid) == null))
        ) 
      {
        this.p.set_my_own_rating(oid, Math.round(this.get_slider_value(oid)), true, true);
      }
    }
    // dismiss auto-dismissing news:
    for (const news of this.news) {
      if (news.auto_dismiss) {
        this.G.N.dismiss(news.key);
      }
    }
    // store gui state:
    const specs = {
      'show_live': this.show_live,
      'details_expanded': this.details_expanded,
      'incoming_delegation_expanded': this.incoming_delegation_expanded,
      'option_expanded': this.option_expanded
    }
    this.G.D.setp(this.pid, "poll_page", JSON.stringify(specs));
    this.G.L.exit("PollPage.ionViewWillLeave", specs);
  }

  ionViewDidLeave() {
    this.G.L.entry("PollPage.ionViewDidLeave");
    this.G.D.save_state();
    this.G.L.exit("PollPage.ionViewDidLeave");
  }

  update_options_delegated() {
    if (this.option_delegated == null) {
      this.option_delegated = new Map<string, string>();
    }
    for (const oid of this.p.oids) {
      const ddm = this.G.D.get_direct_delegation_map(this.pid, oid);
      const list = ddm.get(this.p.myvid) || [];
      var did2 = null;
      for (const [did, status, _] of list) {
        if (status === '2' || status === '0' || status === '1') {
          did2 = did; 
        }
      }
      if (did2) {
        this.option_delegated.set(oid, did2);
        this.delegation_status = "agreed";
      }else{
        this.option_delegated.set(oid, '');
      }
      console.log("opt_ddm", list);
      console.log("option_delegated", this.option_delegated);
    }
    // change status
    this.set_delegate();
    return;
    for (const oid of this.p.oids) {
      // const val = this.G.D.getv(this.pid, "del_oid." + oid);
      // if (val == "null") {
      //   this.option_delegated.set(oid, null);
      // } else {
      //   this.option_delegated.set(oid, val);
      // }
      const ddm = this.G.D.get_direct_delegation_map(this.pid, oid);
      const list = ddm.get(this.p.myvid) || [];
      var did2 = null;
      for (const [did, rank, status] of list) {
        if (status == '2') {
          did2 = did; 
        }
      }
      if (did2) {
        this.option_delegated.set(oid, did2);
      }else{
        this.option_delegated.set(oid, null);
      }
    }
  }

  update_vote_maps() {
    console.log("update vote maps");
    this.p.self_rating_map = this.G.D.get_self_waps(this.pid);
    this.p.effective_rating_map = this.G.D.get_effective_waps(this.pid);
  }

  update_delegation_info() {
    this.G.L.entry("PollPage.update_delegation_info");
    if (this.get_different_delegation_allowed()) {
      this.update_options_delegated();
      this.n_indirect_clients = this.p.get_n_indirect_clients(this.p.myvid);
      return;
    }
    // determine own weight:
    this.n_indirect_clients = this.p.get_n_indirect_clients(this.p.myvid);
    // find incoming delegations:
    const cache = this.G.D.incoming_dids_caches[this.pid];
    this.accepted_requests = [];
    this.declined_requests = [];
    if (cache) {
      for (const [did, [from, url, status]] of cache) {
        const st = this.G.D.getv(this.pid, "del_status."+did);
        if (st && st != status) {
          if (status == 'agreed') {
            if (st == 'revoked') {
              this.G.N.add({
                class: 'delegation_declined', 
                pid: this.pid,
                title: this.translate.instant('news-title.delegation_revoked', {nickname: from}),
              });
              cache.delete(did);
            }
          }
        }else{
          if (status == 'agreed') {
            this.accepted_requests.push({from:from, url:url});
          } else if (status.startsWith('declined')) {
            this.declined_requests.push({from:from, url:url});
          } 
        }
      }
    }
    // find outgoing delegation:
    if (this.get_different_delegation_allowed()) {
      
    }

    var did;
    var pendingSet = new Set<string>();
    const dir_del_map = this.G.D.get_direct_delegation_map(this.pid);
    const list = dir_del_map.get(this.p.myvid) || [];
    for (const [did_, rank, status] of list) {
      if (status == '2') {
        did = did_;
      } else if (status == '0') {
        pendingSet.add(did_);
      }
    }
    if (did) {
      // this.delegate = this.G.Del.get_delegate_nickname(this.pid, did);
      this.set_delegate();
      const agreement = this.G.Del.get_agreement(this.pid, did);
      this.G.L.trace("PollPage.update_delegation_info agreement", agreement);
      var st = "null";
      const list = dir_del_map.get(this.p.myvid) || [];
      for (const [,, status] of list) {
        if (status == '2') {
          st = "agreed";
          break;
        }
      }
      this.delegation_status = st == "agreed" ? "agreed" : agreement.status;
    } else if (pendingSet.size > 0) {
      this.delegation_status = "pending";
      this.delegate = this.G.Del.get_delegate_nickname(this.pid, pendingSet.values().next().value);
    } else {
      this.delegation_status = "none";
    }
    this.update_delegation_toggles();
  }

  update_delegation_toggles() {
    for (let oid of this.oidsorted) {
      // let did = this.G.Del.get_my_outgoing_dids_cache(this.pid).get(oid);
      // if (!did) {
      //   did = this.G.Del.get_my_outgoing_dids_cache(this.pid).get("*");
      // }
      var did;
      const dm = this.G.D.get_direct_delegation_map(this.pid);
      const list = dm.get(this.p.myvid) || [];
      for (const [did_, rank, status] of list) {
        if (status == '2') {
          did = did_;
          break;
        }
      }
      if (did) {
        const a = this.G.Del.get_agreement(this.pid, did);
        this.G.L.trace("PollPage found did, agreement", oid, did, a, [...a.accepted_oids], [...a.active_oids]);
        this.rate_yourself_toggle[oid] = !a.active_oids.has(oid);
      } else {
        this.G.L.trace("PollPage found no did for", oid);
        this.rate_yourself_toggle[oid] = true;
      }
    }
  }

  async onScroll(ev) {
    /** find scroll position to be able to react to it */ 
    // TODO: make sure the page does not scroll away under a "held" slider?
    // if so, this.scroll_position needs to be used somehow to adjust the window's actual scroll position in that case...
    /*
    const elem = this.content;
  
    // the ion content has its own associated scrollElement
    const scrollElement = await ( elem as any).getScrollElement();
  
    const totalContentHeight = scrollElement.scrollHeight;
    const viewportHeight = scrollElement.offsetHeight;
    const scrollPosition = ev.detail.scrollTop;
    this.scroll_position = scrollPosition / (totalContentHeight - viewportHeight);
    */
    this.scroll_position = ev.detail.scrollTop;      
  }

  on_rate_yourself_toggle_change(oid:string) {
  //const new_rating = this.p.own_ratings_map.get(oid).get(this.p.myvid);
    // update delegation data:
    var did = null;
    const dm = this.G.D.get_direct_delegation_map(this.pid);
    const list = dm.get(this.p.myvid) || [];
    for (const [did_, _, status] of list) {
      if (status == '2') {
        did = did_;
        break;
      }
    }

    // set rating
    if (this.rate_yourself_toggle[oid]) {
      const rm = this.G.D.get_self_waps(this.pid).get(this.p.myvid);
      this.p.set_my_own_rating(oid, rm.get(oid), true);
      this.show_stats();
    } else {
      var d = this.p.delegate_id;
      if (this.get_different_delegation_allowed()) {
        d = this.option_delegated.get(oid);
      }
      this.p.set_my_own_rating(oid, +this.G.D.getv(this.pid, "rating."+oid, d)||0, true);
    }

    this.G.Del.update_my_delegation(this.pid, oid, !this.rate_yourself_toggle[oid], did);
    // update slider value:
//    this.get_slider(oid).value = new_rating.toString();
    this.on_delegate_toggle_change();
    this.G.D.save_state();
  }

  on_delegate_toggle_change() {
    // update n_delegated: // TODO: make more efficient
    let sum = 0;
    for (let [oid, b] of Object.entries(this.rate_yourself_toggle)) {
      if (!b) {
        sum++;
      }
    }
    this.n_delegated = sum;
  }

  show_stats() { 
    /** update pies and bars, but not order! */
    if (!this.ready) {
      return
    }
    this.G.L.entry("PollPage.show_stats");
    const p = this.p, T = p.T, myvid = p.myvid, 
          approval_scores_map = T.approval_scores_map,
          shares_map = T.shares_map, approvals_map = T.approvals_map;
    this.votedfor = T.votes_map.get(this.p.myvid);
    for (const oid of p.oids) {
      // FIXME: bar and pie are sometimes null here, but not when running the getElementById in the console. why?
      const a = (approval_scores_map.get(oid) / T.n_not_abstaining) || 0,
            share = shares_map.get(oid),
            bar = <SVGRectElement><unknown>document.getElementById('bar_'+oid),
            pie = <SVGPathElement><unknown>document.getElementById('pie_'+oid),
            R = this.pieradius,
            dx = R * Math.sin(this.two_pi * share),
            dy = R * (1 - Math.cos(this.two_pi * share)),
            more_than_180_degrees_flag = share > 0.5 ? 1 : 0; 
      this.approved[oid] = approvals_map.get(oid).get(myvid);
      if (bar) {
        bar.width.baseVal.valueAsString = (100 * a).toString() + '%';
        bar.x.baseVal.valueAsString = (100 * (1 - a)).toString() + '%';
      } else {
        this.G.L.warn("PollPage.show_stats couldn't change slider bar", oid);
      }
      if (pie) {
        if (share < 1) {
          pie.setAttribute('d', "M 21,25 l 0,-"+R+" a "+R+" "+R+" 0 "+more_than_180_degrees_flag+" 1 "+dx+" "+dy+" Z");
        } else { // a full circle
          pie.setAttribute('d', "M 21,25 l 0,-20 a 20 20 0 1 1 0 "+(2*R)+" a 20 20 0 1 1 0 "+(-2*R)+" Z");
        }
      } else {
        this.G.L.warn("PollPage.show_stats couldn't change pie piece", oid);
      }
      this.set_slider_color(oid, p.get_my_proxy_rating(oid));
      if (this.rate_yourself_toggle[oid]) {
        // update dashed needle showing delegate's rating
        const needle = <SVGLineElement><unknown>document.getElementById('del_needle_'+oid),
              knob = <SVGCircleElement><unknown>document.getElementById('del_knob_'+oid),
              delegate_vid = this.G.Del.get_potential_effective_delegate(this.pid, oid);
//        this.G.L.trace("PollPage.show_stats needle know delegate_vid", needle, knob, delegate_vid);
        if(this.weighted_delegation_allowed && this.p.delegate_id){
          console.log("eff22_knob", this.p.effective_rating_map);
          const rating = this.p.effective_rating_map.get(this.p.myvid).get(oid);
          if (needle) {
            needle.x2.baseVal.valueAsString = (rating).toString() + '%';
          }
          if (knob) {
            knob.cx.baseVal.valueAsString = (rating).toString() + '%';
          }
        }else if (delegate_vid) {
          // const rating = (this.p.proxy_ratings_map.get(oid)||new Map()).get(delegate_vid)||0;
          const rating = this.G.D.getv(this.pid, "rating."+oid, this.p.delegate_id)||0;
          this.G.L.trace("PollPage.show_stats rating", rating);
          if (needle) {
            needle.x2.baseVal.valueAsString = (rating).toString() + '%';
          }
          if (knob) {
            knob.cx.baseVal.valueAsString = (rating).toString() + '%';
          }    
        }
      }
    }
  }

  listeners: Map<any, any[]> = new Map(); // cache for event listeners used in update_order
  final_rand: number = 0;

  async update_order(force=false) {
    // TODO: rather have this triggered by tally function!
    if (this.oidsorted.length != this.p.oids.length) {
      this.needs_refresh = true;
    } else {
      for (let i in this.oidsorted) { // loops over the indices
        if (this.oidsorted[i] != this.p.T.oids_descending[i]) {
  //        this.G.L.trace("PollPage.update_order", this.oidsorted[i], this.p.T.oids_descending[i]);
          this.needs_refresh = true;
          break;
        }
      }  
    }
    if (force || (this.show_live && this.needs_refresh && !(this.refresh_paused))) {
      if (!force) {
        const loadingElement = await this.loadingController.create({
          message: this.translate.instant('poll.sorting'),
          spinner: 'crescent',
          duration: 100
        });
        await loadingElement.present();
        await loadingElement.onDidDismiss();
      }
      // now actually tell html to use the new ordering:
      this.oidsorted = [...this.p.T.oids_descending];
      this.sortingcounter++;
      this.needs_refresh = false;
      setTimeout(()=>{
        this.show_stats.bind(this)();
        // add event listeners to catch events outside knob also on Android:
        for (let i in this.oidsorted) {
          const oid = this.oidsorted[i],
                col = document.getElementById('_slider_'+this.oidsorted[i]+"_"+this.sortingcounter),
                // new event listeners:
                l1 = (ev => { this.onRatingColPointerdown.bind(this)(oid, ev) }),
                l2 = (ev => { this.onRatingColPointerup.bind(this)(oid, ev) }),
                l3 = (ev => { this.onRatingColTouchstart.bind(this)(oid, ev) }),
                l4 = (ev => { this.onRatingColTouchup.bind(this)(oid, ev) });
          if (!!col) {
            if (this.listeners.has(col)) {
              // remove previous listeners since they might belong to a different oid:
              this.G.L.trace("PollPage.update_order removing old event listeners");
              const old = this.listeners.get(col);
              col.removeEventListener("pointerdown", old[0], true);
              col.removeEventListener("pointerup", old[1], true);
              col.removeEventListener("touchstart", old[2], true);
              col.removeEventListener("touchup", old[3], true);
            }
            // add new listeners for this oid:
            col.addEventListener("pointerdown", l1, true);
            col.addEventListener("pointerup", l2, true);
            col.addEventListener("touchstart", l3 , true);
            col.addEventListener("touchup", l4, true);
            this.listeners.set(col, [l1, l2, l3, l4]);  
          }
        }  
        //window.alert("updated");
        this.G.L.trace("PollPage.update_order registered event listeners", this.sortingcounter);
      }, 100);
    } 
  }

  set_slider_color(oid: string, value: number) {
    this.slidercolor[oid] = 
      (value == 0) ? 'vodlered' : 
      (this.votedfor == oid) ? 'vodledarkgreen' :
      (value + ((this.p.T.approval_scores_map.get(oid) / this.p.T.n_not_abstaining) || 0) * 100 <= 100) ? 'vodleblue' : 
      'vodlegreen';
  }

  set_delegate() {
    const dm = this.G.D.get_direct_delegation_map(this.pid);
    const list = dm.get(this.p.myvid) || [[]];
    var d = null;
    // list.sort((a, b) => Number(a[1]) - Number(b[1]));
    d = list[0] ? list[0][0] : null;

    for (const [did, rank, status] of list) {
      if (status == '2') {
        d = did;
        break;
      }
    }
    this.delegate = d ? this.G.Del.get_delegate_nickname(this.pid, d) : null;
    this.p.delegate_id = d? d : null;
  }

  get_delegate(oid?: string) {
    if (this.weighted_delegation_allowed){
      return "Delegate";
    }
    if (!this.get_different_delegation_allowed()) {
      return this.delegate;
    }
    if (oid) {
      return this.G.Del.get_delegate_nickname(this.pid, this.option_delegated.get(oid));
    }
    return this.delegate;
  }

  // CONTROLS:

  toggle_show_live() {
    this.show_live = !this.show_live;
    if (this.show_live) {
      this.update_order();
    }
  }

  expand(oid: string) {
    this.option_expanded[oid] = !this.option_expanded[oid];
  }

  // rating slider:
  // TODO: 1 second after any change to a rating, wait another second if the pointer/mouse is currently down, else call rating_change_ended().

  get_slider(oid: string) {
    this.G.L.trace("PollPage.get_slider ", this.sortingcounter);
    return <HTMLInputElement>document.getElementById('slider_'+oid+"_"+this.sortingcounter);
  }

  set_slider_values() {
    /** update slider knob positions to current proxy ratings from cache */
    for (let oid of this.p.oids) {
      this.get_slider(oid).value = this.p.proxy_ratings_map.get(oid).get(this.p.myvid).toString();
    }
  }

  get_slider_value(oid: string) {
    /** get slider knob position */
    const slider = this.get_slider(oid);
    return !slider ? 0 : Number(slider.value);
  }

  apply_sliders_rating(oid: string) {
    /** update own rating in cache on basis of slider knob position,
     *  but don't store it in the database yet (see also rating_change_ended()).
     */
    if ((!this.delegate || this.rate_yourself_toggle[oid]) 
      || (this.get_different_delegation_allowed() && (this.option_delegated.get(oid) == ''
      || this.option_delegated.get(oid) == null))) {
      this.p.set_my_own_rating(oid, Math.round(this.get_slider_value(oid)), false, true);
    }
    this.show_stats();
  }

  onRatingSliderFocus(oid: string): boolean {
    /** called as soon as range slider gets focus */
    this.G.L.entry("PollPage.onRatingSliderFocus");
    return true;
  }

  onRatingSliderChange(oid: string): boolean {
    /** called whenever a slider is moved */
    var slider = this.get_slider(oid),
        value = Number(slider.value);
    // window.alert("onRatingChange " + value);
    this.set_slider_color(oid, value);
    this.apply_sliders_rating(oid);
    return true;
  }

  onRatingSliderBlur(oid: string): boolean {
    /** called when the slider loses focus */
    this.G.L.entry("PollPage.onRatingSliderBlur");
    this.rating_change_ended(oid);
    return true;
  }

  rating_change_ended(oid: string) {
    /** Called right after releasing the slider. 
     *  Stores slider position in own rating cache AND database. */
    // TODO: make sure this is really always called right after releasing the slider!
    this.G.L.entry("PollPage.rating_change_ended");
    this.p.have_acted = true;
    if (!this.delegate || this.rate_yourself_toggle[oid]
      || (this.get_different_delegation_allowed() && (this.option_delegated.get(oid) == '' || this.option_delegated.get(oid) == null))){
      this.p.set_my_own_rating(oid, Math.round(this.get_slider_value(oid)), true, true);
    }
    this.update_order();
    this.show_stats();
    this.G.D.save_state();
  }

  dragged_oid: string = undefined; // used in onRatingColPointerdown

  // The following three handlers prevent the slider from responding when pointer is not on knob:
  
  onRatingColPointerdown(oid: string, ev: Event): boolean {
    /** event listener called when user starts clicking slider */
    this.p.end_if_past_due();
    if (!this.p.allow_voting) return false;
    this.dragged_oid = oid;
    const pos = this.get_knob_pos(oid), x = !ev ? 0 : (ev instanceof PointerEvent) ? (<PointerEvent>ev).clientX : (<TouchEvent>ev).touches[0].clientX;
    this.G.L.entry("onRatingColPointerdown", this.sortingcounter, oid, this.p.options[oid].name, x, pos);
    // window.alert("onRatingColPointerdown " + pos.left + " " + x + " " + pos.right);
    if ((x < pos.left) || (x > pos.right)) {
      this.swallow_event(ev);
      return false;
    }
    return true;
  }

  onRatingColTouchstart(oid: string, ev: Event): boolean {
    /** event listener called when user starts touching slider */
    this.p.end_if_past_due();
    if (!this.p.allow_voting) return false;
    this.dragged_oid = oid;
    const pos = this.get_knob_pos(oid), x = !ev ? 0 : (ev instanceof PointerEvent) ? (<PointerEvent>ev).clientX : (<TouchEvent>ev).touches[0].clientX;
    this.G.L.entry("onRatingColTouchstart", oid, x, pos);
    // window.alert("onRatingColTouchstart " + pos.left + " " + x + " " + pos.right);
    if ((x < pos.left) || (x > pos.right)) {
      this.swallow_event(ev);
      return false;
    }
    return true;
  }

  onRatingColPointerup(oid: string, ev: Event): boolean {
    /** event listener called when user stops clicking slider */
    this.p.end_if_past_due();
    if (!this.p.allow_voting) return false;
    // FIXME: not always firing on Android if click is too short
    this.G.L.entry("onRatingColPointerup", oid, this.dragged_oid);
    if (oid != this.dragged_oid) {
      this.swallow_event(ev);
      this.dragged_oid = null;
      this.update_order();
      return false;
    } else {
      this.rating_change_ended(oid);
      this.dragged_oid = null;
      return true;
    }
  }

  onRatingColTouchup(oid: string, ev: Event): boolean {
    /** event listener called when user stops touching slider */
    this.p.end_if_past_due();
    if (!this.p.allow_voting) return false;
    // FIXME: not always firing on Android if click is too short
    this.G.L.entry("onRatingColTouchup", oid, this.dragged_oid);
    if (oid != this.dragged_oid) {
      this.swallow_event(ev);
      this.dragged_oid = null;
      this.update_order();
      return false;
    } else {
      this.rating_change_ended(oid);
      this.dragged_oid = null;
      return true;
    }
  }

  onRatingColClick(oid: string, ev: MouseEvent): boolean {
    /** event listener called after clicking or touching slider has ended */
    this.p.end_if_past_due();
    if (!this.p.allow_voting) return false;
    const pos = this.get_knob_pos(oid), x = ev.clientX;
    this.G.L.entry("onRatingColClick", oid, this.p.options[oid].name, x, pos);
    // window.alert("onRatingColClick " + pos.left + " " + x + " " + pos.right);
    if ((x < pos.left) || (x > pos.right)) {
      this.swallow_event(ev);
      return false;
    }
    return true;
  }

  onBodyPointerup(ev: Event): boolean {
    /** event listener called when click ended outside slider area */
    this.p.end_if_past_due();
    if (!this.p.allow_voting) return false;
    // if clicking started in a slider, call that slider's pointerup handler:
    if (this.dragged_oid) {
      this.G.L.entry("onBodyPointerup");
      this.onRatingColPointerup(this.dragged_oid, ev);
    }
    return true;
  }

  onBodyTouchup(ev: Event): boolean {
    /** event listener called when touching ended outside slider area */
    this.p.end_if_past_due();
    if (!this.p.allow_voting) return false;
    // if touching started in a slider, call that slider's touchup handler:
    if (this.dragged_oid) {
      this.G.L.entry("onBodyTouchup");
      this.onRatingColTouchup(this.dragged_oid, ev);
    }
    return true;
  }

  get_my_rating(oid: string) {
    if (this.get_different_delegation_allowed()) {
      const did = this.option_delegated.get(oid);
      if (did && did != "" && !this.rate_yourself_toggle[oid]) {
        const agr = this.G.Del.get_agreement(this.pid, did);
        this.G.D.setv(this.pid, "rating."+oid, "" + this.get_slider_value(oid));
        return this.G.D.getv(this.pid, "rating."+oid, agr.delegate_vid);
      }
      return this.p.get_my_own_rating(oid);
    }
    
    if (this.weighted_delegation_allowed){
      if (!this.rate_yourself_toggle[oid]){
        return this.p.effective_rating_map.get(this.p.myvid).get(oid);
      }
      if (!this.p.self_rating_map.has(this.p.myvid)){
        this.p.self_rating_map.set(this.p.myvid, new Map<string, number>());
      }
      return this.p.self_rating_map.get(this.p.myvid).get(oid) || this.G.S.default_wap;
    }

    if (this.delegate && !this.rate_yourself_toggle[oid]) {
      this.G.D.setv(this.pid, "rating."+oid, "" + this.get_slider_value(oid));
      return this.G.D.getv(this.pid, "rating."+oid, this.p.delegate_id);
    }
    return this.p.get_my_own_rating(oid);
  }

  get_allowed_to_delegate() : boolean {
    if (!this.get_ranked_delegation_allowed() && this.delegation_status == 'agreed' && !this.get_different_delegation_allowed() && !this.weighted_delegation_allowed) {
      return false;
    }
    if (this.weighted_delegation_allowed){
      const ddm = this.G.D.get_direct_delegation_map(this.pid);
      const lst = ddm.get(this.p.myvid) || [];
      var weight_left = 99;
      for (let [, weight, _] of lst){
        weight_left -= parseInt(weight);
      }
      return weight_left > 0;
    }
    if (this.G.D.get_different_delegation_allowed(this.pid)){
      var c = 0;
      for (let key of this.option_delegated.keys()) {
        const did = this.option_delegated.get(key) || '';
        if (did != '') {
          c++;
        }
      }
      return c < this.p.oids.length;
    }
    const dm = this.G.D.get_direct_delegation_map(this.pid);
    const list = dm.get(this.p.myvid) || [];
    return list.length < environment.delegation.max_delegations;
  }

  get_ranked_delegation_allowed() : boolean {
    return this.ranked_delegation_allowed;
  }

  get_different_delegation_allowed() : boolean {
    return this.different_delegation_allowed;
  }

  get_weighted_delegation_allowed(): boolean {
    return this.weighted_delegation_allowed;
  }

  get_knob_pos(oid: string) {
    /** get the slider knob position (left and right pixel coordinates)
     *  to be able to compare with click/touch coordinate:
     */
    const slider = this.get_slider(oid), 
          slider_rect = this.get_screen_coords(slider),
          value = this.get_slider_value(oid),
          knob_center_x = slider_rect.left + (slider_rect.right - slider_rect.left) * value / 100;
    this.G.L.trace("pointer slider value", value);
    return {left: knob_center_x - 20, right: knob_center_x + 20}
  }

  get_screen_coords(element: HTMLElement): DOMRect {
    /** get the screen coordinates of an HTML element */
    if (!element) return new DOMRect();
    return element.getBoundingClientRect();
  }

  swallow_event(ev: Event) {
    /** Stop any form of propagation of an event. 
     *  Used to disable slider reaction outside knob. */
    this.G.L.trace("swallowing event", ev);
    // window.alert("swallow 1");
    // FIXME: does not work in Android app and Chrome-simulated mobile devices yet!
    if (!!ev) {
      // window.alert("swallow 2");
      ev.stopPropagation();
      ev.stopImmediatePropagation();
      ev.preventDefault();  
    }
  }

  // DIALOGS:

  currentModal = null;

  async checkmark_clicked() {
    const confirm = await this.alertCtrl.create({ 
      message: this.translate.instant(
        'poll.checkmark-clicked'), 
      buttons: [
        { 
          text: this.translate.instant('OK'),
          role: 'Ok', 
          handler: () => {
          } 
        } 
      ] 
    }); 
    await confirm.present(); 
  }

  open_delegation_info_dialog_different(event: Event) {
    this.modalController.create({
      component: DelegationDialogDifferentPage, 
      showBackdrop: true,
      componentProps: {parent: this}
    })
    .then((modalElement)=>{modalElement.present();});
  }

  delegation_info_dialog(event: Event) {
    if (this.G.D.get_different_delegation_allowed(this.pid)) {
      this.open_delegation_info_dialog_different(event);
      return;
    }
    this.modalController.create({
      component: DelegationDialogRankedPage, 
      showBackdrop: true,
      componentProps: {parent: this}
    })
    .then((modalElement)=>{modalElement.present();});
  }

  delegate_dialog_weighted(event: Event) {
    this.modalController.create({
      component: DelegationDialogWeightedPage, 
      showBackdrop: true,
      componentProps: {parent: this}
    })
    .then((modalElement)=>{modalElement.present();});
  }

  delegate_dialog(event: Event) {
    /** open the delegation dialog popover */
    this.p.end_if_past_due();
    if (this.p.allow_voting) {
      this.popover.create({
        event, 
        component: DelegationDialogPage, 
        translucent: true,
        showBackdrop: true,
        componentProps: {parent: this}
      })
      .then((popoverElement)=>{
        popoverElement.present();
      });
    }
  }

  async assist_dialog() {
    /** open the assist modal */
    this.p.end_if_past_due();
    if (this.p.allow_voting) {
      const modal = await this.modalController.create({
          component: AssistPage, 
  //        translucent: true,
  //        cssClass: 'assist',
  //        showBackdrop: true,
          componentProps: {P: this},
          backdropDismiss​: false
  //        swipeToClose: true,
  //        presentingElement: this.routerOutlet.nativeEl
      });
      modal.present();

      this.currentModal = modal;
    }
  }
  
  async analysis_dialog() {
    /** open the analysis modal */
    this.p.end_if_past_due();
    const modal = await this.modalController.create({
        component: AnalysisPage, 
//        translucent: true,
        cssClass: 'analysis',
//        showBackdrop: true,
        componentProps: {P: this},
        backdropDismiss​: true
//        swipeToClose: true,
//        presentingElement: this.routerOutlet.nativeEl
    });
    modal.present();

    this.currentModal = modal;
  }

  explain_approval_dialog(oid: string) {
    /** open the explanation dialog modal */
    this.modalController.create({
        component: ExplainApprovalPage, 
//        translucent: true,
        cssClass: 'explain-approval',
        showBackdrop: true,
        componentProps: {parent: this, oid: oid},
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl
    })
    .then((modalElement)=>{
      modalElement.present();
    })
  }

  async revoke_delegation_dialog(dId?: string) : Promise<boolean> { 
    /** open the delegation revokation confirmation dialog alert */
    this.p.end_if_past_due();
    if (this.p.allow_voting) {
      return new Promise(async (resolve) => {
        const confirm = await this.alertCtrl.create({ 
          message: this.translate.instant(
            'poll.revoke_delegation', {nickname: this.delegate}), 
          buttons: [
            { 
              text: this.translate.instant('cancel'), 
              role: 'Cancel',
              handler: () => { 
                console.log('Confirm Cancel.');  
                resolve(false);
              } 
            },
            { 
              text: this.translate.instant('OK'),
              role: 'Ok', 
              handler: () => {
                console.log('Confirm Ok.');
                const dm = this.G.D.get_direct_delegation_map(this.pid);
                const list = dm.get(this.p.myvid) || [];
                var did;
                if (dId){
                  did = dId;
                }else{
                  did = list[0][0] || null;
                  for (const [did_, _, status] of list) {
                    if (status == '2') {
                      did = did_;
                      break;
                    }
                  }
                }
                this.G.Del.revoke_delegation(this.pid, did, "*");
                // this.delegate = null;
                this.set_delegate();
                this.delegation_status = this.delegate ? 'agreed' : 'none';
                this.update_delegation_info();
                this.G.D.save_state();

                resolve(true);
              } 
            } 
          ] 
        }); 
        await confirm.present(); 
      });
    }
    return false; // Return false if `allow_voting` is not true
  }

  async revoke_delegation_different_dialog(oids: string[]): Promise<boolean> {
    this.p.end_if_past_due();
    if (this.p.allow_voting) {
      return new Promise(async (resolve) => {
        const confirm = await this.alertCtrl.create({
          message: this.translate.instant(
            'poll.revoke_delegation', { nickname: this.get_delegate(oids[0]) }
          ),
          buttons: [
            {
              text: this.translate.instant('cancel'),
              role: 'Cancel',
              handler: () => {
                console.log('Confirm Cancel.');
                resolve(false); // Resolve with false on cancel
              },
            },
            {
              text: this.translate.instant('OK'),
              role: 'Ok',
              handler: () => {
                console.log('Confirm Ok.');
                const dm = this.G.D.get_direct_delegation_map(this.pid);
                const list = dm.get(this.p.myvid) || [];
                var did = list[0][0] || null;
                for (const [did_, _, status] of list) {
                  if (status == '2') {
                    did = did_;
                    break;
                  }
                }
                for (let oid of oids) {
                  this.G.Del.revoke_delegation(this.pid, did, oid);
                }
                this.set_delegate();
                this.delegation_status = this.delegate ? 'agreed' : 'none';
                this.update_delegation_info();
                this.G.D.save_state();
  
                resolve(true); // Resolve with true on confirm
              },
            },
          ],
        });
        await confirm.present();
      });
    }
    return false; // Return false if `allow_voting` is not true
  }
  

  add_option(event: Event) {
    if(!this.p.can_add_option()){
      return;
    }
    /** open the add option dialog popover */
    this.p.end_if_past_due();
    if (this.p.allow_voting) {
      // TODO: also add delegation if ospec.type == "-"?
      this.popover.create({
        event, // TODO: use this from Ionic v6 on!
        side: 'top', // TODO: use this from Ionic v6 on!
        component: AddoptionDialogPage, 
        translucent: true,
        showBackdrop: true,
        cssClass: 'add-option-class',
        componentProps: {parent: this}
      })
      .then((popoverElement)=>{
        popoverElement.present();
      });
    }
  }

  // Glossary buttons:

  show_glossary = false;
  glossary_key: string;

  glossary(key: string) {
    this.glossary_key = key;
    this.show_glossary = true;
  }
  dismiss_glossary() {
    this.show_glossary=false;
  }

}
