---
id: react-source4
title: React源码浅析(四)
---

# ReactDOM

---

分析地址
1. /package/react-dom/src/client/ReactDOM.js
2. /package/react-dom/src/client/ReactDOMLegay.js

```
ReactDOM.render(
    <h1 style={{"color":"blue"}}>hello world</h1>,
    document.getElementById('root')
);
```
我们通过编译之后可以看出

```
ReactDOM.render(
    React.createElement(
        'h1',
        { style: { "color": "blue" } },
        'hello world'
    ),
    document.getElementById('root')
);
```

我们则分析ReactDOM.render方法

```
export function render(
  element: React$Element<any>,
  container: DOMContainer,
  callback: ?Function,
) {
  // 判断是否是有效的DOM元素
  invariant(
    isValidContainer(container), 
    'Target container is not a DOM element.',
  );
  if (__DEV__) {
    const isModernRoot =
      isContainerMarkedAsRoot(container) &&
      container._reactRootContainer === undefined;
    if (isModernRoot) {
      console.error(
        'You are calling ReactDOM.render() on a container that was previously ' +
        'passed to ReactDOM.createRoot(). This is not supported. ' +
        'Did you mean to call root.render(element)?',
      );
    }
  }
  
  // 将子元素挂载到html Dom上
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback,
  );
}
```

接下来主要分析legacyRenderSubtreeIntoContainer函数

```
// 将子组件以树形的方式挂载到父组件中
function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>, // 父组件
  children: ReactNodeList, // 子组件树
  container: DOMContainer, // html DOM容器
  forceHydrate: boolean, // 服务端渲染表示
  callback: ?Function, // 回调函数
) {
  if (__DEV__) {
    // 开发模式下告警提示
    topLevelUpdateWarnings(container);
    warnOnInvalidCallback(callback === undefined ? null : callback, 'render');
  }

  // TODO: Without `any` type, Flow says "Property cannot be accessed on any
  // member of intersection type." Whyyyyyy.
  // 获取根元素对象
  let root: RootType = (container._reactRootContainer: any);
  let fiberRoot;
  // 如果没有根元素则创建一个根组件
  if (!root) {
    // Initial mount
    // 创建一个 FiberRoot对象 并将它缓存到DOM容器的_reactRootContainer属性
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate,
    );
    fiberRoot = root._internalRoot;
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function () {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    // Initial mount should not be batched.
    // 初始化容器相关
    unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
  } else {
    fiberRoot = root._internalRoot;
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function () {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    // Update
    updateContainer(children, fiberRoot, parentComponent, callback);
  }
  return getPublicRootInstance(fiberRoot);
}
```
通过判断是否存在root对象，如果不存在，将创建一个FiberRoot对象并将它缓存到DOM容器的_reactRootContainer属性，并对改对象做标记，如果存在则将当前root对象重新做标记并更新所有容器。




