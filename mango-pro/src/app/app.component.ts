import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  addGlobalUncaughtErrorHandler,
  loadMicroApp,
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
} from 'qiankun';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.registerMicroApps();

    // 设置主应用启动后默认进入的微应用。
    setDefaultMountApp('/app-angular-history');

    // https://qiankun.umijs.org/zh/api#startopts
    start();

    // 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本
    runAfterFirstMounted(() => {
      console.log(`[MainApp] first app mounted`);
    });

    // 手动加载微应用
    // loadMicroApp(app, configuration?)
  }

  go(url: string): void {
    this.router.navigate([`/${url}`]);
  }

  /**
   *  注册子项目
   *  [] - 微应用的注册信息
   *  LifeCycles - 全局生命周期钩子
   */
  registerMicroApps(): void {
    registerMicroApps(
      [
        {
          name: 'app-angular-history', //  必选，微应用的名称，微应用之间必须确保唯一。
          entry: '/child/angular-history/', // 必选，微应用的入口
          container: '#subapp-viewport', // 必选，微应用的容器节点的选择器或者 Element 实例
          activeRule: '/app-angular-history', // 必选，微应用的激活规则 还可以: location => location.pathname.startsWith('/app1')
          props: { microName: '我是父应用呀!', micro: 'micro' }, // 可选，主应用需要传递给微应用的数据
          // loader: , // 可选，loading 状态发生变化时会调用的方法
        },
      ],
      {
        beforeLoad: [
          // 生命周期钩子 - 加载前
          (app) => {
            console.log(
              '[LifeCycle] before load %c%s',
              'color: green;',
              app.name
            );
            return Promise.resolve();
          },
        ],
        beforeMount: [
          // 生命周期钩子 - 挂载后
          (app) => {
            console.log(
              '[LifeCycle] before mount %c%s',
              'color: green;',
              app.name
            );
            return Promise.resolve();
          },
        ],
        afterUnmount: [
          (app) => {
            console.log(
              '[LifeCycle] after unmount %c%s',
              'color: green;',
              app.name
            );
            return Promise.resolve();
          },
        ],
      }
    );
  }

  addGlobalUncaughtErrHandler(): void {
    addGlobalUncaughtErrorHandler((event) => {
      console.error(event);
      const { message: msg } = event as any;
      // 加载失败时提示
      if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
        console.error('微应用加载失败，请检查应用是否可运行');
      }
    });
  }
}
