/* 외부와 내부에서 사용할때 import 하는 방식이 달라질수 있다 항상 확인해야함!
 */
import { boot } from 'quasar/wrappers';
import { Dark, LocalStorage, SessionStorage } from 'quasar';
import { Chart, registerables } from 'chart.js';

function goPath(router, route) {
  router.push({ path: '/', name: 'MainLayout' });
}

function checkRoute(routes, url) {
  for (const route of routes) {
    if (route.children.length === 0) {
      return routes.find((route) => route.path == url);
    } else {
      checkRoute(route.children, url);
    }
  }
}

export default boot(async ({ app, router, urlPath, publicPath, redirect }) => {
  console.log('### Initialization ### ', router);

  /* Dark Mode 설정 */
  const darkMode = LocalStorage.getItem('darkMode');
  Dark.set(darkMode);

  Chart.register(...registerables);

  //라우터 인증
  router.beforeEach(async (to, from, next) => {
    const path = SessionStorage.isEmpty() ? '/login' : '/';
    const check = await routerCheck(to);
    if (check) {
      // 이동할 페이지에 인증 정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
      //세션이 있으면 main 화면으로 없으면 로그인 화면으로만
      next(path);
    } else {
      console.log("routing success : '", to);
      if (['/', '/login'].indexOf(to.path) >= 0 && to.path !== path) {
        next(path);
      } else {
        // 검증 패스한 결과는 기존 to로 가야할 경로로 이동
        next(); // 페이지 전환
      }
    }
  });
  // await api({
  //   url: '/auth/languageList',
  // }).then(function (data) {
  //   console.log(app, data);
  //   app.config.globalProperties.languageList = data;
  // });
});

const routerCheck = (to) => {
  return to.matched.some(function (routeInfo) {
    return (
      routeInfo.meta.authRequired || routeInfo.path.indexOf('catchAll') >= 0
    );
  });
};
