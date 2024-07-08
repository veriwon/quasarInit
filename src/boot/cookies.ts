import { boot } from 'quasar/wrappers';
import { useCookies, globalCookiesConfig } from 'vue3-cookies';
/*
root vue 가 인스턴스가 인스턴스화 되기 전에 실행하는 Boot 폴터 Setting Properties
PropName    description
app	        Vue 앱 인스턴스
router	    'src/router/index.js'의 Vue 라우터 인스턴스
store	      Pinia 또는 Vuex 스토어의 인스턴스 - 프로젝트에서 Pinia(src/stores가 있는 경우) 또는 Vuex(src/store가 있는 경우)를 사용하는 경우에만 스토어가 전달됩니다.
ssrContext	SSR용으로 빌드하는 경우 서버 측에서만 사용할 수 있습니다. 더 많은 정보
urlPath	    URL의 경로 이름(경로 + 검색) 부분입니다. 또한 클라이언트 측의 해시도 포함합니다.
publicPath	구성된 공용 경로입니다.
redirect	  다른 URL로 리디렉션하기 위해 호출하는 함수입니다. 문자열(전체 URL) 또는 Vue 라우터 위치 문자열 또는 개체를 허용합니다.
*/
const cookies = useCookies();
export default boot(({ app }) => {
  console.log('### Cookies Boot ### ');

  globalCookiesConfig({
    expireTimes: '30d',
    path: '/',
    domain: '',
    secure: true,
    sameSite: 'None',
  });
});
