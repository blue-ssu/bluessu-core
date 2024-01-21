var mm_servletLocation =
  document.location.protocol +
  '//' +
  document.location.host +
  '/AFPServlet/NavigationServlet';
var userAccessibilityModeState = false;
var afpVerifierKey = '9c3ca88ec81c64bd4a39b86581769f28';
var jsonCacheTimeStampsRep =
  '{"quickLaunchTS":"0","sap-ep-pp":"","sap-ep-ur":"9432ca0a827f75496c2bd8561fd5bccb","sap-ep-inp":"","sap-ep-nh":"1705825165693","sap-ep-ul":"ko","searchProvidersTS":"0"}';
var cacheTimeStampsRep = jsonCacheTimeStampsRep.parseJSON();
var globalQueryString = '';
var globalPostBody = null;
var initConfiguration = function () {
  LSAPI.AFPPlugin.configuration.init(
    '{"NavPrefix":{"mode6":"/irj/servlet/prt/portal/prteventname/Navigate/prtroot/pcd\u00213aportal_content\u00212fevery_user\u00212fgeneral\u00212fdefaultAjaxframeworkContent\u00212fcom.sap.portal.contentarea","mode5":null,"mode3":"/irj/portal","mode11":"/irj/portal","mode10":"/irj/portal","mode2":"/irj/portal","mode1":"/irj/servlet/prt/portal/prtroot/pcd\u00213aportal_content\u00212fevery_user\u00212fgeneral\u00212fdefaultAjaxframeworkContent\u00212fcom.sap.portal.standalonecontentarea","mode0":"/irj/servlet/prt/portal/prteventname/Navigate/prtroot/pcd\u00213aportal_content\u00212fevery_user\u00212fgeneral\u00212fdefaultAjaxframeworkContent\u00212fcom.sap.portal.contentarea"},"User":{"LogonUid":"20231623","Email":null,"FirstName":null,"DisplayName":"박현우,\\x20","IsAnonymous":false,"LastName":"박현우","Salutation":null,"Name":"20231623"},"configurationAttributes":{"titleSuffix":"숭실대학교 유세인트\u0028u-SAINT\u0029","titleMode":"Launch","useUrlSchema":"false","screenCaptureToolUrl":null,"screenCaptureMode":null,"navLevels":""}}',
    '{"AFPResources":{"com.sap.portal.navigation.ShowOpenInNewWindow":"신규 윈도우에서 열기","com.sap.portal.navigation.showSolutionManager":"문제 리포트","com.sap.portal.navigation.DelayForSuggestionResults":"350","com.sap.portal.navigation.ShowRefresh":"새로 고침","com.sap.portal.navigation.ShowPersonalize":"개인 설정","com.sap.portal.navigation.afp.enableStatefulNavigation":"true","com.sap.portal.navigation.showFavorites":"브라우저 즐겨찾기에 추가"}}',
    '{"AFPResources":{"FAVORITES_LABEL":"브라우저\\x20즐겨찾기에\\x20추가","CONTENT_AREA_TOOLTIP":"컨텐트\\x20영역","SOLMAN_LABEL":"문제\\x20리포트","REFRESH_LABEL":"새로\\x20고침","HELP_LABEL":"도움말","PORTAL_FAVORITES_LABEL":"포털\\x20즐겨찾기에\\x20추가","OPTIONS_DESCRIPTION":"이\\x20페이지에\\x20대한\\x20옵션을\\x20표시합니다.","PERSONALIZE_LABEL":"개인\\x20설정","OPTIONS_LABEL":"옵션","PRINT_LABEL":"인쇄","NEW_WINDOW_LABEL":"신규\\x20윈도우에서\\x20열기","DETAILS_LABEL":"세부사항"}}',
    '',
    '/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.BackTargetComponent',
    '',
  );
  LSAPI.AFPPlugin.configuration.setRTL('false' == 'true' ? true : false);
  LSAPI.getTabsetPlugin()._private.init(
    '[{"isDefault":true,"isEditable":false,"size":9,"name":"모두","id":"ALL"}]',
    'true',
    '6',
  );
};
if (LSAPI.AFPPlugin.configuration == null) {
  initConfiguration();
} else {
  JSUtils.waitForObject('LSAPI.AFPPlugin.configuration', initConfiguration);
}
LSAPI.AFPPlugin.urlhandler.init('');
LSAPI.Collections._private.collectionsModel._private.addFixedJSONCollections(
  [],
);
var usedConnectors = '';
var supportPresonailzedData = true;
frameworkSupport.init({ portal_mode: 'full_portal' });
frameworkSupport.updateTitle('숭실대학교 유세인트(u-SAINT)');
var AFPGlobal = {};
var afp_username = 'd886d991df5542eeebfcc529b00666aa';
var workProtectUnloadMsg = '저장하지 않은 데이터가 있습니다.';
frameworkSupport.initChildHtmlPath({
  childHtmlPath: '/com.sap.portal.navigation.helperservice/html/child.html',
});
var disablePersonalize = true;
frameworkSupport.initModalPopupURL({
  modalPopupURL:
    '/irj/servlet/prt/portal/prteventname/Navigate/prtroot/pcd!3aportal_content!2fevery_user!2fgeneral!2fdefaultAjaxframeworkContent!2fcom.sap.portal.contentarea',
});
staticHeaderlessConfig.init({
  disableStaticHeaderless: 'true',
  staticHeaderlessURL:
    '?elYn9giFpO_tfjvA_Ho50oLitgonjQF-0UYA_SAPUSER.PRIVATE_DATASOURCE.un\x3a20231623',
});
if (LSAPI != 'undefined' && LSAPI != null) {
  LSAPI.getVisualPlugin().init('숭실대학교 유세인트(u-SAINT)');
}
if (doResize != 'undefined' && doResize != null) {
  doResize.init('disabled');
}
if (windowDefaultSizeObject != 'undefined' && windowDefaultSizeObject != null) {
  windowDefaultSizeObject.init('width=890,height=88%');
}
if (LSAPI != 'undefined' && LSAPI != null) {
  LSAPI.getScreenCapturingPlugin().init('', 'null');
}
EPCM.getSAPTop()
  .LSAPI.getSessionPlugin()
  ._private.init(
    'null',
    'false',
    '/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.LogOutComponent',
  );
EPCM.getSAPTop().LSAPI.getSessionPlugin()._private.setLogoffDelayTimer('0');
