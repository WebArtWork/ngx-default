"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[468],{6468:(C,i,o)=>{o.r(i),o.d(i,{ProfileModule:()=>y});var c=o(4039),e=o(9467),l=o(2537),f=o(9185),d=o(3934),p=o(2515),u=o(6814),m=o(2812),g=o(8610),h=o(8383);function P(n,x){if(1&n){const t=e.EpF();e.TgZ(0,"wform",16),e.NdJ("wChange",function(a){e.CHM(t);const s=e.oxw();return e.KtG(s.update(a))}),e.qZA()}if(2&n){const t=e.oxw();e.Q6J("config",t.formProfile)("submition",t.user)}}let _=(()=>{class n{constructor(t,r,a){this._form=t,this._core=r,this.us=a,this.formProfile=this._form.getForm("profile",{formId:"profile",title:"Profile Settings",components:[{name:"Text",key:"name",root:!0,focused:!0,fields:[{name:"Placeholder",value:"Enter your name"},{name:"Label",value:"Name"}]},{name:"Text",key:"phone",fields:[{name:"Placeholder",value:"Enter your phone"},{name:"Label",value:"Phone"}]},{name:"Text",key:"bio",fields:[{name:"Placeholder",value:"Enter your bio"},{name:"Label",value:"Bio"}]}]}),this.formPassword=this._form.getForm("change password",{formId:"change password",title:"Change password",components:[{name:"Password",key:"oldPass",root:!0,focused:!0,fields:[{name:"Placeholder",value:"Enter your old password"},{name:"Label",value:"Old Password"}]},{name:"Password",key:"newPass",root:!0,fields:[{name:"Placeholder",value:"Enter your new password"},{name:"Label",value:"New Password"}]}]}),this._core.next("us.user",()=>{const s={};this._core.copy(this.us.user,s),console.log(s,this.us.user),this.user=s})}update(t){this._core.copy(t,this.us.user),this.us.update()}change_password(){this._form.modal(this.formPassword,{label:"Change",click:(t,r)=>{this.us.change_password(t.oldPass,t.newPass),r()}}).then(t=>{this.us.change_password(t.oldPass,t.newPass)})}static#e=this.\u0275fac=function(r){return new(r||n)(e.Y36(l.o),e.Y36(f.pX),e.Y36(d.K))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-profile"]],decls:21,vars:3,consts:[[1,"container"],[3,"padding"],[1,"profile__header","w-card__header"],[1,"avatar","_profile"],["width","50","height","50","alt","User Avatar",1,"avatar__img",3,"src"],["for","userAvatarUrl",1,"avatar__upload"],[1,"material-icons","avatar__icon"],[1,"profile__body"],[3,"config","submition","wChange",4,"ngIf"],[1,"profile__footer"],[1,"profile__logout"],["type","danger",3,"click"],[1,"material-icons"],["translate",""],[1,"profile__password"],["type","link","translate","",3,"click"],[3,"config","submition","wChange"]],template:function(r,a){1&r&&(e.TgZ(0,"div",0)(1,"wcard",1)(2,"div",2)(3,"div")(4,"div",3),e._UZ(5,"img",4),e.TgZ(6,"label",5)(7,"i",6),e._uU(8,"edit"),e.qZA()()()()(),e.TgZ(9,"div",7),e.YNc(10,P,1,2,"wform",8),e.TgZ(11,"div",9)(12,"div",10)(13,"wbutton",11),e.NdJ("click",function(){return a.us.logout()}),e.TgZ(14,"span",12),e._uU(15,"logout"),e.qZA(),e.TgZ(16,"span",13),e._uU(17,"Profile.Logout"),e.qZA()()(),e.TgZ(18,"div",14)(19,"wbutton",15),e.NdJ("click",function(){return a.change_password()}),e._uU(20," Profile.Change Password "),e.qZA()()()()()()),2&r&&(e.xp6(1),e.Q6J("padding",!0),e.xp6(4),e.Q6J("src",a.us.user.thumb||"assets/default.png",e.LSH),e.xp6(5),e.Q6J("ngIf",a.user))},dependencies:[p.P,u.O5,m.r,g.A,h.U],styles:["[_ngcontent-%COMP%]:root{--c-basic: #3558ae;--c-primary: #256eff;--c-primary-hover: #0051f1;--c-secondary: red;--c-bg-primary: #f3f4f7;--c-bg-secondary: #ffffff;--c-bg-tertiary: #fcfdfe;--c-border: #f0f1f7;--c-shadow: #f3f3f3;--c-text-primary: #666666;--c-text-secondary: #19235c;--c-placeholder: #adb8c6}html.dark[_ngcontent-%COMP%]:root{--c-basic: #333;--c-bg-primary: #282828;--c-bg-secondary: #343434;--c-bg-tertiary: #404040;--c-border: #404040;--c-shadow: #444444;--c-text-primary: #ffffff;--c-text-secondary: #ffffff;--c-placeholder: #7a7a7a}[_nghost-%COMP%]{width:100%}[_nghost-%COMP%]   wcard[_ngcontent-%COMP%]{width:100%;transition:all .3s;display:block}.container[_ngcontent-%COMP%]{padding:unset}.profile__header[_ngcontent-%COMP%]{z-index:9;top:10px;position:absolute;right:25px;letter-spacing:0;line-height:23px;font-weight:500;font-size:20px;color:var(--c-text-primary);display:flex;justify-content:space-between;align-items:center;border-radius:8px}.profile__footer[_ngcontent-%COMP%]{margin-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}@media (max-width: 767.9px){.profile__footer[_ngcontent-%COMP%]{flex-direction:column;align-items:center}.profile__footer[_ngcontent-%COMP%]   .profile__logout[_ngcontent-%COMP%]{order:2;margin-top:20px}}.profile__logout[_ngcontent-%COMP%]   .w-btn[_ngcontent-%COMP%]{margin:0;display:flex;justify-content:space-between;align-items:center}.profile__logout[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%]{margin-right:10px}.avatar[_ngcontent-%COMP%]{border-radius:50%;border:1px solid var(--c-border);position:relative;margin:0 auto;padding:3px}.avatar._profile[_ngcontent-%COMP%]{width:60px;height:60px}.avatar__img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;border-radius:50%}.avatar__upload[_ngcontent-%COMP%]{cursor:pointer;position:absolute;right:0;bottom:0;width:24px;height:24px;border-radius:50%;background:var(--c-primary);display:flex;justify-content:center;align-items:center;transition:.3s all ease-in-out}.avatar__icon[_ngcontent-%COMP%]{color:#fff;font-size:16px}.profile__password[_ngcontent-%COMP%]{cursor:pointer}"]})}return n})();var v=o(6512);const w=[{path:"",component:_}];let y=(()=>{class n{static#e=this.\u0275fac=function(r){return new(r||n)};static#t=this.\u0275mod=e.oAB({type:n});static#o=this.\u0275inj=e.cJS({imports:[v.Bz.forChild(w),c.I]})}return n})()}}]);