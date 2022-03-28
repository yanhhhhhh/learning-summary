//作者：      xxchen
//更新日志
//20180322 - xxchen - 修复mgPage和mgThis加载时机出现问题的bug
//20180322 - xxchen - 将UserToken和AppInfo修改为Promise获取方式  xxchen
//20180322 - zsq    - 还原__SafeDo方法，去除setTimeout
//20180612 - xxchen - 添加mgMobile接口
//20180612 - xxchen - 添加mgTaskForm接口
//20180614 - xxchen - 添加mgWorkFlow接口
//20180614 - xxchen - 添加mgShortcut接口
//20180620 - xxchen - 添加mgForm接口，调整回调策略
//20180621 - xxchen - 将mgMobile改名为mgPlatform，添加OpenFile接口
//20180627 - xxchen - 修改mgSlot的实现
//20180627 - xxchen - 移除mgShortcut接口，插件可以采用mgSlot实现同样的功能
//20180725 - xxchen - 完善mgWorkFlow接口，添加IsExist，GetDataStatus，GetDataCurrentTasks三个接口
//20180725 - xxchen - 添加调整表单大小的接口mgForm.Resize
//20180814 - xxchen - 添加mgPage.AddMenuItem和mgPage.RemoveMenuItem
//20180816 - xxchen - 将lambda表达式修改为函数
//20180905 - xxchen - 添加mgContext.GetPrivilege和mgContext.GetPrivilegeBatch方法
//20181221 - xxchen - 添加mgDateToTicks函数
//20181227 - xxchen - 添加mgPage.Capture，mgPlatform.Share函数
//20190326 - xxchen - 添加mgApi接口
//20190401 - xxchen - 添加文件读写相关的接口
//20190921 - jlchen - 在mgPlatform中添加打电话、选项目、清除缓存、开发者、退出函数（待优化）

/**
 * 
 * @returns 判断当前浏览器环境是否为移动端
 */
function IsMobileChrome() {
  try {
    if (navigator == undefined)
      return true;
    var userAgent = navigator.userAgent;
    if (userAgent == undefined || userAgent == null)
      return true;
    //判断是否为谷歌&判断是否为火狐
    if (/(?:Chrome|CriOS)/.test(userAgent) || /(?:Firefox)/.test(userAgent))
      return false;
    return true;
  } catch (err) {
    return true;
  }
}
//判断当前运行环境
if (IsMobileChrome()) { //#region  主框架封装的mango.js
  mgNativeDic = {}
  mgNativeFuncDic = {}
  if (!Native) {
    function Native(apiName, data) {
      if (mgNativeDic[apiName]) {
        mgNativeDic[apiName](data);
      }
    };

    function NativeFunc(apiName, data, callback) {
      if (mgNativeFuncDic[apiName]) {
        mgNativeFuncDic[apiName](data, callback);
      }
    };

    //***************************************************************************************************
    //mg
    //***************************************************************************************************
    var mg = function () {};
    /*
    设置没有返回值的api
    */
    mg.SetActionApi = function (apiName, callback) {
      mgNativeDic[apiName] = callback;
    };
    /*
    设置具有返回值的api
    */
    mg.SetFuncApi = function (apiName, callback) {
      mgNativeFuncDic[apiName] = callback;
    };
  }

  __SafeDo = function (action) {
    return new Promise(function (resolve, reject) {
      try {
        action(resolve);
      } catch (ex) {
        console.error(ex);
        mgLog.Error("JS错误", ex);
        reject(ex);
      }
    });
  }

  //***************************************************************************************************
  //mgLog
  //***************************************************************************************************
  var mgLog = function () {};
  mgLog.Debug = function (msg, e) {
    __SafeDo(function () {
      Native("mgLog.Debug", {
        message: msg,
        exception: e
      });
    });
  };
  mgLog.Info = function (msg, e) {
    __SafeDo(function () {
      Native("mgLog.Info", {
        message: msg,
        exception: e
      });
    });
  };
  mgLog.Warn = function (msg, e) {
    __SafeDo(function () {
      Native("mgLog.Warn", {
        message: msg,
        exception: e
      });
    });
  };
  mgLog.Error = function (msg, e) {
    __SafeDo(function () {
      Native("mgLog.Error", {
        message: msg,
        exception: e
      });
    });
  };
  mgLog.Fatal = function (msg, e) {
    __SafeDo(function () {
      Native("mgLog.Fatal", {
        message: msg,
        exception: e
      });
    });
  };

  //***************************************************************************************************
  //mgThis
  //***************************************************************************************************
  if (typeof mgThis === 'undefined') {
    mgThis = function () {};
  }
  //宿主加载后，会设置该属性
  mgThis.GetResPath = function (name) {
    return mgThis.AppInfo.RootDirectory + '/' + name;
  };
  /*
  获取当前应用的UserToken
  return: Promise<string>
  */
  mgThis.GetUserToken = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgThis.GetUserToken", {
        key: mgPage.Key
      }, callback);
    });
  };
  /*
  获取当前应用的AppInfo
  return: Promise<any>
  */
  mgThis.GetAppInfo = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgThis.GetAppInfo", {
        key: mgPage.Key
      }, callback);
    });
  };

  /*
  设置图片地址增加userToken
  */
  mgThis.HandleImgUrls = async function (obj, anyKey) {
    if (obj == null || (typeof obj) != 'object') {
      return obj;
    }
    var userToken = await mgThis.GetUserToken();
    var address = anyKey == undefined ? "http" : anyKey;
    let handleUrl = function (obj, address, userToken) {
      for (let key in obj) {
        var value = obj[key];
        if (value == undefined || value == null) {
          continue;
        }
        var type = typeof value;
        //如果属性值为对象，递归遍历赋值
        if (type == 'object') {
          handleUrl(value, address, userToken);
          continue;
        }
        //判断字符串是否包含地址，增加UserToken
        if (type == 'string') {
          if (value.indexOf(address) > -1) {
            //判断是否已经有userToken,有则去掉
            let index = obj[key].indexOf("&UserToken=");
            if (index > -1) {
              obj[key] = obj[key].substring(0, index) + "&UserToken=" + userToken;
            } else {
              obj[key] = obj[key] + "&UserToken=" + userToken;
            }
          }
        }
      }
    }
    handleUrl(obj, address, userToken);
    return obj;
  }

  //***************************************************************************************************
  //mgConfig
  //***************************************************************************************************
  var mgConfig = function () {};
  /*
  获取当前平台类型
  return: Promise<string> - 返回值可能为：Unknown, Server, Web, Pc, Ios, Android, Windows, WinPhone
  */
  mgConfig.GetPlatform = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgConfig.Platform", null, callback);
    });
  };
  /*
  获取当前应用程序名称
  return: Promise<string>
  */
  mgConfig.GetApplicationName = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgConfig.ApplicationName", null, callback);
    });
  };
  /*
  获取当前应用程序版本号
  return: Promise<string>
  */
  mgConfig.GetApplicationVersion = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgConfig.ApplicationVersion", null, callback);
    });
  };
  /*
  获取服务地址
  return: Promise<string>
  */
  mgConfig.GetServerAddress = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgConfig.ServerAddress", null, callback);
    });
  };
  //***************************************************************************************************
  //mgContext
  //***************************************************************************************************
  var mgContext = function () {};
  /*
  获取当前登录的用户Id
  return: Promise<string>
  */
  mgContext.GetUserId = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgContext.UserId", null, callback);
    });
  };
  /*
  获取当前打开的项目Id
  return: Promise<string>
  */
  mgContext.GetProjectId = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgContext.ProjectId", null, callback);
    });
  };
  /*
  获取当前的连接状态
  return: Promise<string> - state有三种可能值：NotLogined，Connected，Offline
  */
  mgContext.GetConnectionState = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgContext.ConnectionState", null, callback);
    });
  };
  /*
  获取当前的打开的项目信息
  map: string[], 需要返回的项目字段
  return: Promise<any>
  */
  mgContext.GetCurrentProject = function (map) {
    return __SafeDo(function (callback) {
      NativeFunc("mgContext.GetCurrentProject", map, callback);
    });
  };
  /*
  获取当前登录的用户信息
  map: string[], 需要返回的用户字段
  return: Promise<any>
  */
  mgContext.GetCurrentUser = function (map) {
    return __SafeDo(function (callback) {
      NativeFunc("mgContext.GetCurrentUser", map, callback);
    });
  };
  /*
  批量获取指定模块的权限信息
  moduleKeys: string[] *必填，模块的Key集合
  return: Promise<bool[]> //是否启用指定模块bool值集合
  */
  mgContext.GetPrivilegeBatch = function (moduleKeys) {
    return __SafeDo(function (callback) {
      NativeFunc("mgContext.GetPrivilege", moduleKeys, callback);
    });
  }
  /*
  获取指定模块的权限信息
  moduleKey: string *必填，模块的
  return: Promise<bool> //是否启用指定模块
  */
  mgContext.GetPrivilege = function (moduleKey) {
    return __SafeDo(function (callback) {
      NativeFunc("mgContext.GetPrivilege", [moduleKey], callback);
    }).then(function (results) {
      return results[0];
    });
  }
  //***************************************************************************************************
  //mgCache
  //***************************************************************************************************
  var mgCache = function () {};
  /*
  获取指定键的缓存值
  key: string，键
  defaultValue: any，键不存在时返回的默认值
  setDefault: bool, 如果键不存在，是否设置键的值为默认值
  return: Promise<string> - json字符串
   */
  mgCache.Get = function (key, defaultValue, setDefault) {
    return __SafeDo(function (callback) {
      NativeFunc("mgCache.Get", {
        key: key,
        default: defaultValue || JSON.stringify(defaultValue),
        setDefault: setDefault
      }, function (s) {
        callback(JSON.stringify(s))
      });
    });
  };
  /*
  设置指定键的缓存值
  key: string，键
  value: any，缓存值
  expiredSeconds: int，缓存有效的时间（s），默认为0，表示永久有效
  return: Promise(bool) - 返回是否设定成功
   */
  mgCache.Set = function (key, value, expiredSeconds) {
    return __SafeDo(function (callback) {
      NativeFunc("mgCache.Set", {
        key: key,
        value: JSON.stringify(value),
        expiredSeconds: expiredSeconds
      }, callback);
    });
  };
  /*
  移除指定键及缓存
  key: string，键
  return: Promise(bool) - 返回是否移除成功
   */
  mgCache.Remove = function (key) {
    return __SafeDo(function (callback) {
      NativeFunc("mgCache.Remove", key, callback);
    });
  };
  /*
  指定键是否存在缓存值
  key: string，键
  return: Promise(bool) - 回调，返回指定键是否存在
   */
  mgCache.Exists = function (key) {
    return __SafeDo(function (callback) {
      NativeFunc("mgCache.Exists", key, callback);
    });
  };

  //***************************************************************************************************
  //mgService
  //***************************************************************************************************
  var mgService = function () {};
  /*
  调用同步服务
  serviceName：string，调用服务的名称，必填
  param：any，调用服务的参数，可为null
  return: Promise<Result> - 返回调用服务后的结果
  */
  mgService.Invoke = function (serviceName, param) {
    return __SafeDo(function (callback) {
      NativeFunc("mgService.Invoke", {
        appKey: mgThis.AppInfo.Key,
        serviceName: serviceName,
        param: JSON.stringify(param),
      }, callback);
    });
  };
  /*
  调用异步服务
  serviceName：string，调用服务的名称，必填
  param：any，调用服务的参数，可为null
  return: Promise<Result> - 返回调用服务后的结果
  */
  mgService.InvokeAsync = function (serviceName, param) {
    return __SafeDo(function (callback) {
      NativeFunc("mgService.InvokeAsync", {
        appKey: mgThis.AppInfo.Key,
        serviceName: serviceName,
        param: JSON.stringify(param),
      }, callback);
    });
  };

  /*
  注册服务
  serviceName: 服务名称 *必填
  param: 服务参数 *必填
  param:{
    type:int,   //0：未正常跳转，1：工作流页面。
    url:string,  //地址、工作流步骤
    title：string,   //页面标题
    hasNaviBar：bool,   //是否显示导航栏
  }
  */
  mgService.Register = function (serviceName, param) {
    __SafeDo(function () {
      Native("mgService.Register", {
        appKey: mgThis.AppInfo.Key,
        serviceName: serviceName,
        param: param
      });
    });
  };
  //***************************************************************************************************
  //mgSlotmgSlot
  //***************************************************************************************************
  var mgSlot = function () {};
  /*
  插入插头
  plug：json，必填字段：Name(string)，SlotName(string)，可选字段：Data(any)，Order(int)
  callback: function，插头执行时的回调函数
  return: Promise<string> - 返回创建的插头Id
  */
  mgSlot.PushPlug = function (plug, callback) {
    __SafeDo(function () {
      NativeFunc("mgSlot.PushPlug", {
        appKey: mgThis.AppInfo.Key,
        plug: plug,
      }, callback);
    });
  };
  /*
  拔出插头
  slotName: 插槽名称
  name: 插头名称
  */
  mgSlot.PullPlug = function (slotName, name) {
    __SafeDo(function () {
      Native("mgSlot.PullPlug", {
        appKey: mgThis.AppInfo.Key,
        slotName: slotName,
        name: name
      });
    });
  };

  /*
  获取指定插槽的所有插头
  slotName: 插槽名称 *必填
  return: Promise<Plug[]>
  Plug:{
    "Name": "string", //插头的名称
    "SlotName": "string", //所在的插槽名称
    "Data": "any", //插头包含的数据，任意类型
    "Order": 0, //插头顺序
  }
  */
  mgSlot.GetPlugs = function (slotName) {
    return __SafeDo(function (callback) {
      NativeFunc("mgSlot.GetPlugs", {
        slotName: slotName
      }, callback);
    });
  };

  /*
  注册插槽
  slotName: 插槽名称 *必填
  description: 插槽描述 选填
  */
  mgSlot.Register = function (slotName, description) {
    __SafeDo(function () {
      Native("mgSlot.Register", {
        appKey: mgThis.AppInfo.Key,
        slot: {
          Name: slotName,
          Description: description
        }
      });
    });
  };

  //***************************************************************************************************
  //mgDialog
  //***************************************************************************************************
  var mgDialog = function () {};
  /*
  弹出提示框
  header：string，标题
  content：string，内容
  */
  mgDialog.Alert = function (header, content) {
    __SafeDo(function () {
      Native("mgDialog.Alert", {
        header: header,
        content: content
      });
    });
  };
  /*
  弹出提示框
  header：string，标题
  content：string，内容
  return: Promise<string> - 返回值为：Ok，Cancel
  */
  mgDialog.ShowMessage = function (header, content) {
    return __SafeDo(function (callback) {
      NativeFunc("mgDialog.ShowMessage", {
        header: header,
        content: content
      }, callback);
    });
  };

  /*
  弹出模态对话框，仅PC端有效
  settings = {
      Address: string, //网页地址，*必填
      Title: string, //对话框标题，默认为应用程序名称
      ShowInTaskBar: bool, //是否显示在任务栏，默认为false
      ShowCancelButton: bool, //是否显示取消按钮，默认为false
      ShowOkButton: bool, //是否显示确定按钮，默认为false
      ShowMinimizeButton: bool, //是否显示最小化按钮，默认为true
      ShowMaximizeButton: bool, //是否显示最大化按钮，默认为true
      ResizeMode: string, //调整窗口大小的模式，有效值：NoResize，CanMinimize，CanResize，CanResizeWithGrip，默认为NoResize
      Width: double, //窗口宽度，默认为自动调整宽度
      Height: double, //窗口高度，默认为自动调整高度
      OkText: string, //确定按钮的文字，默认为"确定"
      CancelText: string, //取消按钮的文字，默认为"取消"
      IsOkDefault: bool, //确定按钮是否是默认按钮，默认为true
      IsCancelDefault: bool, //取消按钮是否是默认按钮，默认为false
      SizeToContent: string //内容填充模式，有效值：Manual，Width，Height，WidthAndHeight，默认为Manual
  }
  return: Promise<string> - 返回CloseResult，可能取值为：Cancel，Ok，Hidden
  */
  mgDialog.ShowDialog = function (settings) {
    return __SafeDo(function (callback) {
      NativeFunc("mgDialog.ShowDialog", settings, callback);
    });
  };

  /*
  弹出窗体，仅PC端有效
  settings = {
      Address: string, //网页地址，*必填
      Title: string, //对话框标题，默认为应用程序名称
      ShowInTaskBar: bool, //是否显示在任务栏，默认为false
      ShowCancelButton: bool, //是否显示取消按钮，默认为false
      ShowOkButton: bool, //是否显示确定按钮，默认为false
      ShowMinimizeButton: bool, //是否显示最小化按钮，默认为true
      ShowMaximizeButton: bool, //是否显示最大化按钮，默认为true
      ResizeMode: string, //调整窗口大小的模式，有效值：NoResize，CanMinimize，CanResize，CanResizeWithGrip，默认为NoResize
      Width: double, //窗口宽度，默认为自动调整宽度
      Height: double, //窗口高度，默认为自动调整高度
      OkText: string, //确定按钮的文字，默认为"确定"
      CancelText: string, //取消按钮的文字，默认为"取消"
      IsOkDefault: bool, //确定按钮是否是默认按钮，默认为true
      IsCancelDefault: bool, //取消按钮是否是默认按钮，默认为false
      SizeToContent: string //内容填充模式，有效值：Manual，Width，Height，WidthAndHeight，默认为Manual
  }
  */
  mgDialog.ShowWindow = function (settings) {
    __SafeDo(function () {
      Native("mgDialog.ShowWindow", settings);
    });
  };

  //***************************************************************************************************
  //mgStatus  仅PC端有效
  //***************************************************************************************************
  var mgStatus = function () {};
  /*
  设置状态栏状态信息
  message: string，状态栏内容
  progress：int，状态栏进度[0-100]，默认为0
  showSeconds：int，
  */
  mgStatus.SetStatusInfo = function (message, progress, showSeconds) {
    __SafeDo(function () {
      Native("mgStatus.SetStatusInfo", {
        message: message,
        progress: progress,
        showSeconds: showSeconds
      });
    });
  };
  /*
  将状态栏设置为默认状态
  */
  mgStatus.SetDefaultStatus = function () {
    __SafeDo(function () {
      Native("mgStatus.SetDefaultStatus", null);
    });
  }
  //***************************************************************************************************
  //mgTip
  //***************************************************************************************************
  var mgTip = function () {};
  /*
  显示提示信息
  message: string，提示内容
  progress：int，进度[0-100]，默认为0
  */
  mgTip.Show = function (message, progress) {
    __SafeDo(function () {
      Native("mgTip.Show", {
        message: message,
        progress: progress
      });
    });
  };
  /*
  关闭提示信息
  */
  mgTip.Close = function () {
    __SafeDo(function () {
      Native("mgTip.Close", null);
    });
  };

  //***************************************************************************************************
  //mgWeb
  //***************************************************************************************************
  var mgWeb = function () {};
  /*
  添加服务器端消息处理函数
  handlerKey: string, 处理函数的唯一标识符
  message: string，消息名称
  return: Promise<any> - 返回的数据类型为
  {
      MsgName: string, //消息名称
      Data: string //消息附加的数据
  }
  */
  mgWeb.AddWebMsgHandler = function (handlerKey, message) {
    return __SafeDo(function (callback) {
      NativeFunc("mgWeb.AddWebMsgHandler", {
        _key: handlerKey,
        appKey: mgThis.AppInfo.Key,
        message: message
      }, callback);
    });
  };
  /*
  移除服务器端消息处理函数
  handlerKey: string, 处理函数的唯一标识符
  message: string，消息名称
  */
  mgWeb.RemoveWebMsgHandler = function (handlerKey, message) {
    __SafeDo(function () {
      Native("mgWeb.RemoveWebMsgHandler", {
        _key: handlerKey,
        appKey: mgThis.AppInfo.Key,
        message: message
      });
    });
  };
  /*
  广播消息
  message: string, 消息名称
  content: any, 消息内容
  boardcastType: string，广播类型，可选值：None, Self, ProjectGroup, ProjectGroupOther, Other, All，默认为Self
  return: Promise<Result> - 返回广播是否成功
  */
  mgWeb.SendWebMsg = function (message, content, boardcastType) {
    return __SafeDo(function (callback) {
      NativeFunc("mgWeb.SendWebMsg", {
        message: message,
        content: content,
        boardcastType: boardcastType
      }, callback);
    });
  };
  /*
  获取url
  apiPath: string，api地址
  urlParam：any，url参数
  return: Promise<string>
  */
  mgWeb.GetUrl = function (apiPath, urlParam) {
    return __SafeDo(function (callback) {
      NativeFunc("mgWeb.GetUrl", {
        apiPath: apiPath,
        urlParam: urlParam
      }, callback);
    });
  };
  /*
  HTTP GET请求
  settings = {
      apiPath: string, //api地址，*必填
      urlParam: any, //url参数
      showProgress: bool //是否显示进度信息
  }
  return: Promise<Result> - 返回结果
  */
  mgWeb.GetResult = function (settings) {
    return __SafeDo(function (callback) {
      settings.appKey = mgThis.AppInfo.Key;
      NativeFunc("mgWeb.GetResult", settings, callback);
    });
  };
  /*
  HTTP POST请求
  settings = {
      apiPath: string, //api地址，*必填
      urlParam: any, //url参数
      files: string[], //待上传的文件路径集合
      showProgress: bool //是否显示进度信息
  }
  return: Promise<Result> - 返回结果
  */
  mgWeb.Post = function (settings) {
    return __SafeDo(function (callback) {
      settings.appKey = mgThis.AppInfo.Key;
      NativeFunc("mgWeb.Post", settings, callback);
    });
  };

  //***************************************************************************************************
  //mgNavi
  //***************************************************************************************************
  var mgNavi = function () {};
  /*
  导航到指定页面
  address: string，内部地址或网址，*必填
  title: string，标题，可选
  data: any，其它需要传递的数据，可选
  */
  mgNavi.Go = function (address, title, data) {
    __SafeDo(function () {
      Native("mgNavi.Go", {
        appKey: mgThis.AppInfo.Key,
        address: address,
        title: title,
        data: data
      });
    });
  };
  /*
  后退
  data: any，需要传递的数据，可选
  */
  mgNavi.GoBack = function (data) {
    __SafeDo(function () {
      Native("mgNavi.GoBack", data);
    });
  };
  /*
  获取上一个页面传递过来的参数
  return: Promise<any> - 返回data
  */
  mgNavi.GetData = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgNavi.GetData", null, callback)
    });
  };

  //***************************************************************************************************
  //mgPage
  //***************************************************************************************************
  if (typeof mgPage === 'undefined') {
    var mgPage = function () {};
    //页面加载后，宿主会设置该属性
    mgPage.Key = '';
  }
  //页面加载后，宿主会调用该函数
  mgPage.OnLoaded = function (data) {};
  //页面出现后，宿主会调用该函数
  mgPage.OnAppearing = function (data) {};
  //页面消失后，宿主会调用该函数
  mgPage.OnDisappearing = function (data) {};
  //设置title
  mgPage.SetTitle = function (title) {
    __SafeDo(function () {
      Native("mgPage.SetTitle", {
        key: mgPage.Key,
        title: title
      });
    });
  };
  /*
  添加右上角菜单项
  text:string - 菜单标题，不能重复 *必填
  icon:string - 菜单图标 *必填
  callback: function - 点击该菜单项的回调函数 *必填
  */
  mgPage.AddMenuItem = function (text, icon, callback) {
    return __SafeDo(function () {
      NativeFunc("mgPage.AddMenuItem", {
        key: mgPage.Key,
        text: text,
        icon: mgThis.GetResPath(icon)
      }, callback);
    });
  };

  /*
  移除右上角菜单项
  text:string - 待移除的菜单项标题 *必填
  */
  mgPage.RemoveMenuItem = function (text) {
    __SafeDo(function () {
      Native("mgPage.RemoveMenuItem", {
        key: mgPage.Key,
        text: text,
      });
    });
  }

  /*
  对当前页面截图
  */
  mgPage.Capture = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgPage.Capture", {
        key: mgPage.Key
      }, callback);
    });
  }

  //***************************************************************************************************
  //mgPlatform 
  //***************************************************************************************************
  var mgPlatform = function () {};
  /*
  选择图片
  type: 0：所有类型 1：相册选取  2：前置摄像头   3：后置摄像头  -调取照片的方式
  return: Promise<string> - 返回图片的绝对路径
  */
  mgPlatform.PickPhoto = function (type) {
    return __SafeDo(function (callback) {
      NativeFunc("mgPlatform.PickPhoto", {
        type: type
      }, callback);
    });
  };

  /*
  打开文件
  url: string - 文件路径，可以是网址，也可以是本地路径
  */
  mgPlatform.OpenFile = function (url) {
    __SafeDo(function () {
      Native("mgPlatform.OpenFile", {
        url: url
      });
    });
  }

  /*
  分享
  filePath: string - 分享的文件路径
  subject: string - 分享主题
  message: string - 分享内容
  */
  mgPlatform.Share = function (filePath, subject, message) {
    __SafeDo(function () {
      Native("mgPlatform.Share", {
        subject: subject,
        message: message,
        filePath: filePath
      });
    })
  }

  /*
  读取指定路径的文件
  filePath: string - 文件的本地路径
  return Promise<string> - 返回文件二进制数据的Base64编码字符串
  */
  mgPlatform.ReadFile = function (filePath) {
    return __SafeDo(function (callback) {
      NativeFunc("mgPlatform.ReadFile", filePath, callback);
    });
  }

  /*
  保存数据至指定的文件
  filePath: string - 待保存的文件路径
  data: string - 文件的二进制数据的Base64编码字符串
  return Promise<bool> - 如果保存成功，返回true，否则，返回false
  */
  mgPlatform.SaveFile = function (filePath, data) {
    return __SafeDo(function (callback) {
      NativeFunc("mgPlatform.SaveFile", {
        filePath: filePath,
        data: data
      }, callback);
    })
  }


  /*
  拨打电话
  number: string - 电话号码
  */
  mgPlatform.TelNumber = function (number) {
    __SafeDo(function () {
      Native("mgPlatform.TelNumber", {
        number: number
      });
    })
  }

  /*
  清除缓存
  */
  mgPlatform.ClearCache = function () {
    __SafeDo(function () {
      Native("mgPlatform.ClearCache", {});
    })
  }

  /*
  设置开发者模式
  enable: bool - 启动和关闭
  */
  mgPlatform.EnableDev = function (enable) {
    return __SafeDo(function (callback) {
      NativeFunc("mgPlatform.EnableDev", {
        enable: enable
      }, callback);
    })
  }


  /*
  设置链接地址
  address: string - ip地址
  */
  mgPlatform.DevConnection = function (address) {
    return __SafeDo(function (callback) {
      NativeFunc("mgPlatform.DevConnection", {
        address: address
      }, callback);
    })
  }

  /*
  退出登录
  reset: bool - 是否清空账号密码
  */
  mgPlatform.Logout = function (reset) {
    __SafeDo(function () {
      Native("mgPlatform.Logout", {
        reset: reset
      });
    })
  }

  /*
  保存数据至指定的文件
  return: Promise<IRecord> - 返回的数据类型为
  {
      Id: string, //项目id
      Name: string //项目名称
  }  
  */
  mgPlatform.SelectedProject = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgPlatform.SelectedProject", {}, callback);
    });
  };

  /*
  获取经纬度以及地址信息
  accuracy: int, 精度 Default = 0,Lowest = 1,Low = 2, Medium = 3,High = 4,Best = 5
  isAddress： bool, 维度
  return: Promise<IRecord> - 返回的数据类型为
  {
      Latitude: double, //纬度
      Longitude: double, //精度
      Address: string //地址信息
  }  
  */
  mgPlatform.GetLocation = function (accuracy, isAddress) {
    return __SafeDo(function (callback) {
      NativeFunc("mgPlatform.GetLocation", {
        accuracy: accuracy,
        isAddress: isAddress,
      }, callback);
    });
  };

  /*
  打开地图显示定位点
  longitude: double, 精度
  latitude： double, 维度
  address: string, 地址
  type:int, 地图类型(0:百度地图，1：高德地图，2：腾讯地图，3：浏览器)
  return: Promise<bool> - 返回
  */
  mgPlatform.OpenMapView = function (longitude, latitude, address, type) {
    return __SafeDo(function (callback) {
      NativeFunc("mgPlatform.OpenMapView", {
        longitude: longitude,
        latitude: latitude,
        address: address,
        type: type
      }, callback);
    });
  };


  /*
  读取开发者配置信息
  return: Promise<IRecord> - 返回的数据类型为
  {
    AgentAddress: string, //ip地址
    EnableMSDev: bool //是否开启开发者
  }
  */
  mgPlatform.GetSettingInfo = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgPlatform.GetSettingInfo", {}, callback);
    })
  }


  /*
  打开摄像头扫人脸
  */
  mgPlatform.SearchFace = function () {
    __SafeDo(function () {
      Native("mgPlatform.SearchFace", {});
    })
  };

  /*
  人脸识别
  return: Promise<Result> - 返回的数据类型为
  {
    IsOK: bool, 
    Data: record 
  }
  */
  mgPlatform.VerifyFace = function () {
    return __SafeDo(function (callback) {
      NativeFunc("mgPlatform.VerifyFace", {}, callback)
    })
  };

  /*
  扫二维码功能
  */
  mgPlatform.ScanQrcode = function () {
    __SafeDo(function () {
      Native("mgPlatform.ScanQrcode", {});
    })
  };

  /*
  确保文件可访问
  return: Promise<string>，返回可访问的路径
  */
  mgPlatform.MakeFileAccessible = function (filePath) {
    return __SafeDo(function (callback) {
      NativeFunc("mgPlatform.MakeFileAccessible", {
        AppPath: mgThis.AppInfo.RootDirectory,
        FilePath: filePath
      }, callback);
    });
  };

  //***************************************************************************************************
  //mgWorkflow
  //***************************************************************************************************
  var mgWorkflow = function () {};
  /*
  创建任务
  firstStepFormType: string，流程的第一步骤的表单类型，*必填
  dataId: Id, 如果是重新打开未提交的数据，则需要传入该值，如果是全新创建，则不需要提供该数据，可选
  state：any，任意值，业务模块调用时可以传入该参数，表单在OnCreate接口处可以接收到，可选
  firstStepFormParam: string, 流程第一步骤的表单参数，用于过滤表单，可选
  */
  mgWorkflow.Create = function (firstStepFormType, dataId, state, firstStepFormParam) {
    __SafeDo(function () {
      Native("mgWorkflow.Create", {
        firstStepFormType: firstStepFormType,
        dataId: dataId,
        firstStepFormParam: firstStepFormParam,
        state: state
      });
    });
  };

  /*
  显示指定数据项的任务详情
  dataId: Id, 数据项Id
  */
  mgWorkflow.ShowTaskDetail = function (dataId) {
    __SafeDo(function () {
      Native("mgWorkflow.ShowTaskDetail", {
        dataId: dataId
      });
    });
  }

  /*
  指定的数据项是否在工作流中存在
  dataId: Id, 数据项Id
  return bool
  */
  mgWorkflow.IsExist = function (dataId) {
    return __SafeDo(function (callback) {
      NativeFunc("mgWorkflow.IsExist", {
        dataId: dataId
      }, callback);
    });
  }

  /*
  批量获取数据的审批状态
  dataIds: Id[]，数据项Id数组
  return Dictionary<Id, TaskStatus>
  */
  mgWorkflow.GetDataStatus = function (dataIds) {
    return __SafeDo(function (callback) {
      NativeFunc("mgWorkflow.GetDataStatus", dataIds, callback);
    });
  }

  /*
  根据数据Id获取任务信息
  dataIds: Id[], 数据项Id数组
  return Dictionary<Id, IRecord[]>
  ---任务IRecord的详细信息如下：
  {
       "_id": "ObjectId", //任务Id
       "InstanceId": "ObjectId", //实例Id
       "StepName": "string", //当前步骤名称
       "Title": "string", //任务标题
       "Receive": { //接收人
             "_id": "ObjectId", //用户Id
             "Email": "xxx@qq.com", //邮箱
             "PhoneNumber": "(86)136xxxxxxxx", //手机号
             "RealName": "超级管理员" //真实姓名
       },
       "ReceiveTime": "/Date/" //接收时间
  }
   */
  mgWorkflow.GetDataCurrentTasks = function (dataIds) {
    return __SafeDo(function (callback) {
      NativeFunc("mgWorkflow.GetDataCurrentTasks", dataIds, callback);
    });
  }

  //***************************************************************************************************
  //mgTaskForm
  //***************************************************************************************************
  var mgTaskForm = function () {};
  /*
  注册表单
  formType: string，表单类型，*必填
  url: string，表单的链接，*必填
  */
  mgTaskForm.Register = function (formType, url) {
    __SafeDo(function () {
      Native("mgTaskForm.Register", {
        appKey: mgThis.AppInfo.Key,
        formType: formType,
        url: url
      });
    });
  };

  //***************************************************************************************************
  //mgForm 表示当前表单
  //***************************************************************************************************
  var mgForm = function () {};
  /*
  设置当前表单的属性
  key: string, 属性名，可选为：title,isReadonly,height,result
  value: any，属性值，对应类型：string,bool,double,FormData
  */
  mgForm.Set = function (key, value) {
    __SafeDo(function () {
      Native("mgForm.Set", {
        ["key"]: mgPage.Key,
        [key]: value,
      });
    });
  }

  /*
  重新调整表单大小
  */
  mgForm.Resize = function () {
    console.debug('mgForm.Reize - body height:' + document.body.clientHeight);
    mgForm.Set('height', document.body.clientHeight);
  }

  //***************************************************************************************************
  //mgApi 表示通用的API
  //***************************************************************************************************
  var mgApi = function () {};
  /*
  上传文件
  filePath: string, *必填 文件路径
  fileId: Id, 选填，文件Id，如果为null，则表示新增文件，如果不为null，则表示更新文件
  showProgress: bool, 选填，是否显示进度条，默认为false
  alertError: bool, 如果上传出错，是否弹出错误提示框，默认为false
  return Promise<FileRecord>
  */
  mgApi.UploadFile = function (filePath, fileId, showProgress, alertError) {
    return __SafeDo(function (callback) {
      NativeFunc("mgApi.UploadFile", {
        appKey: mgThis.AppInfo.Key,
        filePath: filePath,
        fileId: fileId,
        showProgress: showProgress,
        alertError: alertError
      }, callback);
    });
  }

  /*
  下载文件
  fileId: Id, *必填，文件Id，如果为null，则表示新增文件，如果不为null，则表示更新文件
  version: int, 选填，文件版本号，默认为-1，表示最新版本
  showProgress: bool, 选填，是否显示进度条，默认为false
  return Promise<string> 返回文件路径
  */
  mgApi.DownloadFile = function (fileId, version, showProgress) {
    return __SafeDo(function (callback) {
      NativeFunc("mgApi.DownloadFile", {
        appKey: mgThis.AppInfo.Key,
        fileId: fileId,
        version: version,
        showProgress: showProgress
      }, callback);
    });
  }
  //#endregion
} else {
  //#endregion
  /**
   * mgLog.Debug
   * mgLog.Info
   * mgLog.Warn
   * mgLog.Error
   * mgLog.Error
   * 
   * mgThis.GetResPath(未实现)
   * mgThis.GetUserToken
   * mgThis.GetAppInfo(未实现)
   * mgThis.HandleImgUrls
   * 
   * mgConfig.GetPlatform(未实现)
   * mgConfig.GetApplicationName(未实现)
   * mgConfig.GetApplicationVersion(未实现)
   * mgConfig.GetServerAddress(未实现)
   * 
   * mgContext.GetUserId
   * mgContext.GetProjectId
   * mgContext.GetConnectionState(未实现)
   * mgContext.GetCurrentProject
   * mgContext.GetCurrentUser
   * mgContext.GetPrivilege
   * mgContext.GetPrivilegeBatch
   * 
   * mgCache.Get
   * mgCache.Set
   * mgCache.Remove
   * mgCache.Exists
   * 
   * mgService.Invoke(未实现)
   * mgService.InvokeAsync(未实现)
   * mgService.Register(未实现)
   * 
   * mgSlot.PushPlug(未实现)
   * mgSlot.PullPlug(未实现)
   * mgSlot.GetPlugs(未实现)
   * mgSlot.Register(未实现)
   * 
   * mgDialog.Alert(未实现)
   * mgDialog.ShowMessage(未实现)
   * mgDialog.ShowDialog(未实现)
   * mgDialog.ShowWindow(未实现)
   * 
   * mgStatus.SetStatusInfo(未实现)
   * mgStatus.SetDefaultStatus (未实现)
   * 
   * mgTip.Show(未实现)
   * mgTip.Close(未实现)
   * 
   * mgWeb.AddWebMsgHandler(未实现)
   * mgWeb.AddWebMsgHandler(未实现)
   * mgWeb.RemoveWebMsgHandler(未实现)
   * mgWeb.SendWebMsg(未实现)
   * mgWeb.GetUrl
   * mgWeb.GetResult
   * mgWeb.Post
   * 
   * mgNavi.Go
   * mgNavi.GoBack
   * mgNavi.GetData
   * 
   * mgPage(未实现)
   * 
   * 
   * mgPlatform (未实现)
   * 
   * mgWorkflow(未实现)
   * 
   * mgTaskForm(未实现)
   * 
   * mgDateToTicks
   * 
   */

  //#region  全局配置信息

  const debugSetting = {
    appKey: "455F3D65-3761-4EB1-88FD-76087B6D0F4B",
    serverUrl: "http://14.18.84.92:43211/api/", //内网禅道http://192.168.2.87:43211/api/
    userName: "13480275197", //账号
    password: "275197", //密码
    userInfo: null,
    tokenKey: null,
    userToken: null, //根据账号密码获取的userToken
    projectId: "Id(5b1e957f8470a716b812c11c)",
    platformType: 16, //Android平台
    clientVersion: "1.0.0.1"
  }
  //#endregion

  //#region mgLog
  var mgLog = function () {}
  mgLog.Debug = function (msg, e) {
    console.log(msg);
  };
  mgLog.Info = function (msg, e) {
    console.log(msg);
  };
  mgLog.Warn = function (msg, e) {
    console.warn(msg);
  };
  mgLog.Error = function (msg, e) {
    console.error(msg);
  };
  mgLog.Fatal = function (msg, e) {
    console.error(msg);
  };
  //#endregion

  //#region mgThis
  var mgThis = function () {}
  mgThis.GetResPath = function () {
    return "程序员努力研发中..."
  }
  mgThis.GetUserToken = async function () {
    if (!debugSetting.userToken) {
      await mgDebug.login();
      return debugSetting.userToken;
    }
  }
  /*
  获取当前应用的AppInfo
  return: Promise<any>
  */
  mgThis.GetAppInfo = function () {
    return "程序员努力研发中..."
  };

  /*
  设置图片地址增加userToken
  */
  mgThis.HandleImgUrls = async function (obj, anyKey) {
    if (obj == null || (typeof obj) != 'object') {
      return obj;
    }
    var userToken = await mgThis.GetUserToken();
    var address = anyKey == undefined ? "http" : anyKey;
    let handleUrl = function (obj, address, userToken) {
      for (let key in obj) {
        var value = obj[key];
        if (value == undefined || value == null) {
          continue;
        }
        var type = typeof value;
        //如果属性值为对象，递归遍历赋值
        if (type == 'object') {
          handleUrl(value, address, userToken);
          continue;
        }
        //判断字符串是否包含地址，增加UserToken
        if (type == 'string') {
          if (value.indexOf(address) > -1) {
            //判断是否已经有userToken,有则去掉
            let index = obj[key].indexOf("&UserToken=");
            if (index > -1) {
              obj[key] = obj[key].substring(0, index) + "&UserToken=" + userToken;
            } else {
              obj[key] = obj[key] + "&UserToken=" + userToken;
            }
          }
        }
      }
    }
    handleUrl(obj, address, userToken);
    return obj;
  }
  //#endregion

  //#region mgConfig
  var mgConfig = function () {};
  /*
  获取当前平台类型
  return: Promise<string> - 返回值可能为：Unknown, Server, Web, Pc, Ios, Android, Windows, WinPhone
  */
  mgConfig.GetPlatform = function () {
    return "程序员努力研发中..."
  };
  /*
  获取当前应用程序名称
  return: Promise<string>
  */
  mgConfig.GetApplicationName = function () {
    return "程序员努力研发中..."
  };
  /*
  获取当前应用程序版本号
  return: Promise<string>
  */
  mgConfig.GetApplicationVersion = function () {
    return "程序员努力研发中..."
  };
  /*
  获取服务地址
  return: Promise<string>
  */
  mgConfig.GetServerAddress = function () {
    return "程序员努力研发中..."
  };
  //#endregion

  //#region mgContext
  var mgContext = function () {};
  /*
  获取当前登录的用户Id
  return: Promise<string>
  */
  mgContext.GetUserId = async function () {
    if (debugSetting.userToken == null) {
      await mgDebug.login();
    }
    return Promise.resolve(debugSetting.userInfo._id);
  };
  /*
  获取当前打开的项目Id
  return: Promise<string>
  */
  mgContext.GetProjectId = async function () {

    let apiPath = "/v1/p/core/project/list";
    let urlParam = {
      UserToken: await mgThis.GetUserToken(),
      // ListParams: ListParams
    };
    let url = await mgWeb.GetUrl(apiPath, urlParam);
    let result = await mgDebug.Http(url, 'get');
    let ProjectId = result.Data[0]._id;
    debugSetting.projectId = ProjectId;
    return Promise.resolve(debugSetting.projectId);
  };
  /*
  获取当前的连接状态
  return: Promise<string> - state有三种可能值：NotLogined，Connected，Offline
  */
  mgContext.GetConnectionState = function () {
    return "程序员努力研发中..."
  };
  /*
  获取当前的打开的项目信息
  map: string[], 需要返回的项目字段
  return: Promise<any>
  */
  mgContext.GetCurrentProject = async function (map) {
    // if (debugSetting.userToken == null) {
    //     await mgDebug.login();
    // }
    let apiPath = "/v1/p/core/project/info";
    let urlParam = {
      UserToken: await mgThis.GetUserToken(),
      Id: await mgContext.GetProjectId()
      // ListParams: ListParams
    };
    let url = await mgWeb.GetUrl(apiPath, urlParam);
    let result = await mgDebug.Http(url, 'get');
    return Promise.resolve(result.Data);
  };
  /*
  获取当前登录的用户信息
  map: string[], 需要返回的用户字段
  return: Promise<any>
  */
  mgContext.GetCurrentUser = async function (map) {
    let apiPath = "/v1/sys/user/info";
    let urlParam = {
      UserToken: await mgThis.GetUserToken(),
      Id: await mgContext.GetUserId()
      // ListParams: ListParams
    };
    let url = await mgWeb.GetUrl(apiPath, urlParam);
    let result = await mgDebug.Http(url, 'get');
    return Promise.resolve(result.Data);
  };
  mgContext.GetMemberId = async function () {
    let apiPath = "/v1/p/core/member/id";
    let urlParam = {
      UserToken: await mgThis.GetUserToken(),
      UserId: await mgContext.GetUserId(),
      ProjectId: await mgContext.GetProjectId()
    }
    let url = await mgWeb.GetUrl(apiPath, urlParam);
    let result = await mgDebug.Http(url, 'get');
    return Promise.resolve(result.Data);
  }
  /*
  批量获取指定模块的权限信息
  moduleKeys: string[] *必填，模块的Key集合
  return: Promise<bool[]> //是否启用指定模块bool值集合
  */
  mgContext.GetPrivilegeBatch = async function (moduleKeys) {
    let apiPath = "/v1/p/core/access/func/info";
    let urlParam = {
      UserToken: await mgThis.GetUserToken(),
      ActorType: 0, //参与者类型：0-成员，1-组织，2-角色
      ActorId: await mgContext.GetMemberId(),
      ModuleKeys: moduleKeys
      // ListParams: ListParams
    };
    let url = await mgWeb.GetUrl(apiPath, urlParam);
    let result = await mgDebug.Http(url, 'get');
    let bools = []
    result.Data.forEach(element => {
      bools.push(element.RealAccess)
    })
    return Promise.resolve(bools);
  }
  /*
  获取指定模块的权限信息
  moduleKey: string *必填，模块的
  return: Promise<bool> //是否启用指定模块
  */
  mgContext.GetPrivilege = async function (moduleKey) {
    let result = await mgContext.GetPrivilegeBatch([moduleKey])
    return Promise.resolve(result[0]);
  }
  //#endregion 

  //#region mgCache
  var mgCache = function () {};
  /*
  获取指定键的缓存值
  key: string，键
  defaultValue: any，键不存在时返回的默认值
  setDefault: bool, 如果键不存在，是否设置键的值为默认值
  return: Promise<string> - json字符串
  */
  mgCache.Get = async function (key, defaultValue, setDefault) {
    try {
      if (key) {
        let result = await mgCache.Exists(key)
        if (result) {
          let item = localStorage.getItem(key);
          //先将拿到的试着进行json转为对象的形式
          try {
            item = JSON.parse(item);
          } catch (error) {
            //如果不行就不是json的字符串，就直接返回
            item = item;
          }
          //如果有startTime的值，说明设置了失效时间
          if (item && item.hasOwnProperty("startTime")) {
            let date = new Date().getTime();
            //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
            if (date - item.startTime > item.expires) {
              //缓存过期，清除缓存，返回false
              localStorage.removeItem(key);
              return Promise.resolve(false)
            } else {
              //缓存未过期，返回值
              return Promise.resolve(item.value)
            }
          } else {
            //如果没有设置失效时间，直接返回值
            return Promise.resolve(item)
          }
        } else {
          return Promise.resolve(null)
        }
      } else if (setDefaul) {
        // setDefaul=true,如果键不存在，设置键的值为默认值
        localStorage.setItem(key, defaultValue);
      } else {
        // 键不存在时返回的默认值
        return Promise.resolve(defaultValue)
      }
    } catch (error) {
      return Promise.reject(false)
    }
  };
  /*
  设置指定键的缓存值
  key: string，键
  value: any，缓存值
  expiredSeconds: int，缓存有效的时间（s），默认为0，表示永久有效
  return: Promise(bool) - 返回是否设定成功
  */
  mgCache.Set = function (key, value, expiredSeconds) {
    try {
      let options = {
        key: key,
        value: value,
        expires: expiredSeconds,
        startTime: new Date().getTime()
      }
      if (options.key) {
        if (options.expiredSeconds) {
          //如果options.expiredSeconds设置了的话
          //以options.key为key，options为值放进去
          localStorage.setItem(options.key, JSON.stringify(options));
        } else {
          //如果options.expiredSecond没有设置，就判断一下value的类型
          let type = Object.prototype.toString.call(options.value);
          //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
          if (type == '[object Object]') {
            options.value = JSON.stringify(options.value);
          }
          if (type == '[object Array]') {
            options.value = JSON.stringify(options.value);
          }
          localStorage.setItem(options.key, options.value);
        }
      } else {
        Promise.resolve(false)
      }
      return Promise.resolve(true)
    } catch (err) {
      return Promise.reject(false)
    }
  };
  /*
  移除指定键及缓存
  key: string，键
  return: Promise(bool) - 返回是否移除成功
  */
  mgCache.Remove = function (key) {
    try {
      if (key) {
        if (localStorage.hasOwnProperty(key)) {
          window.localStorage.removeItem(key);
          return Promise.resolve(true)
        } else {
          return Promise.resolve(null)
        }
      } else {
        return Promise.resolve(true)
      }
    } catch (error) {
      return Promise.reject(false)
    }
  };
  /*
  指定键是否存在缓存值
  key: string，键
  return: Promise(bool) - 回调，返回指定键是否存在
  */
  mgCache.Exists = function (key) {
    try {
      if (key) {
        if (localStorage.hasOwnProperty(key)) {
          return Promise.resolve(true)
        } else {
          return Promise.resolve(false)
        }
      } else {
        return Promise.resolve(false)
      }
    } catch (error) {
      return Promise.reject(false)
    }
  };
  //#endregion 

  //#region  mgService
  var mgService = function () {};
  /*
  调用同步服务
  serviceName：string，调用服务的名称，必填
  param：any，调用服务的参数，可为null
  return: Promise<Result> - 返回调用服务后的结果
  */
  mgService.Invoke = function (serviceName, param) {
    return "程序员努力研发中..."
  };
  /*
  调用异步服务
  serviceName：string，调用服务的名称，必填
  param：any，调用服务的参数，可为null
  return: Promise<Result> - 返回调用服务后的结果
  */
  mgService.InvokeAsync = function (serviceName, param) {
    return "程序员努力研发中..."
  };

  /*
  注册服务
  serviceName: 服务名称 *必填
  param: 服务参数 *必填
  param:{
  type:int,   //0：未正常跳转，1：工作流页面。
  url:string,  //地址、工作流步骤
  title：string,   //页面标题
  hasNaviBar：bool,   //是否显示导航栏
  }
  */
  mgService.Register = function (serviceName, param) {
    return "程序员努力研发中..."
  };
  //#endregion

  //#region mgSlot
  var mgSlot = function () {};
  /*
  插入插头
  plug：json，必填字段：Name(string)，SlotName(string)，可选字段：Data(any)，Order(int)
  callback: function，插头执行时的回调函数
  return: Promise<string> - 返回创建的插头Id
  */
  mgSlot.PushPlug = function (plug, callback) {
    return "程序员努力研发中..."
  };
  /*
  拔出插头
  slotName: 插槽名称
  name: 插头名称
  */
  mgSlot.PullPlug = function (slotName, name) {
    return "程序员努力研发中..."
  };

  /*
  获取指定插槽的所有插头
  slotName: 插槽名称 *必填
  return: Promise<Plug[]>
  Plug:{
  "Name": "string", //插头的名称
  "SlotName": "string", //所在的插槽名称
  "Data": "any", //插头包含的数据，任意类型
  "Order": 0, //插头顺序
  }
  */
  mgSlot.GetPlugs = function (slotName) {
    return "程序员努力研发中..."
  };

  /*
  注册插槽
  slotName: 插槽名称 *必填
  description: 插槽描述 选填
  */
  mgSlot.Register = function (slotName, description) {
    return "程序员努力研发中..."
  };
  //#endregion

  //#region mgDialog
  var mgDialog = function () {};
  /*
  弹出提示框
  header：string，标题
  content：string，内容
  */
  mgDialog.Alert = function (header, content) {
    alert(content);
  };
  /*
  弹出提示框
  header：string，标题
  content：string，内容
  return: Promise<string> - 返回值为：Ok，Cancel
  */
  mgDialog.ShowMessage = function (header, content) {
    return "程序员努力研发中..."
  };

  /*
  弹出模态对话框，仅PC端有效
  settings = {
    Address: string, //网页地址，*必填
    Title: string, //对话框标题，默认为应用程序名称
    ShowInTaskBar: bool, //是否显示在任务栏，默认为false
    ShowCancelButton: bool, //是否显示取消按钮，默认为false
    ShowOkButton: bool, //是否显示确定按钮，默认为false
    ShowMinimizeButton: bool, //是否显示最小化按钮，默认为true
    ShowMaximizeButton: bool, //是否显示最大化按钮，默认为true
    ResizeMode: string, //调整窗口大小的模式，有效值：NoResize，CanMinimize，CanResize，CanResizeWithGrip，默认为NoResize
    Width: double, //窗口宽度，默认为自动调整宽度
    Height: double, //窗口高度，默认为自动调整高度
    OkText: string, //确定按钮的文字，默认为"确定"
    CancelText: string, //取消按钮的文字，默认为"取消"
    IsOkDefault: bool, //确定按钮是否是默认按钮，默认为true
    IsCancelDefault: bool, //取消按钮是否是默认按钮，默认为false
    SizeToContent: string //内容填充模式，有效值：Manual，Width，Height，WidthAndHeight，默认为Manual
  }
  return: Promise<string> - 返回CloseResult，可能取值为：Cancel，Ok，Hidden
  */
  mgDialog.ShowDialog = function (settings) {
    return "程序员努力研发中..."
  };

  /*
  弹出窗体，仅PC端有效
  settings = {
    Address: string, //网页地址，*必填
    Title: string, //对话框标题，默认为应用程序名称
    ShowInTaskBar: bool, //是否显示在任务栏，默认为false
    ShowCancelButton: bool, //是否显示取消按钮，默认为false
    ShowOkButton: bool, //是否显示确定按钮，默认为false
    ShowMinimizeButton: bool, //是否显示最小化按钮，默认为true
    ShowMaximizeButton: bool, //是否显示最大化按钮，默认为true
    ResizeMode: string, //调整窗口大小的模式，有效值：NoResize，CanMinimize，CanResize，CanResizeWithGrip，默认为NoResize
    Width: double, //窗口宽度，默认为自动调整宽度
    Height: double, //窗口高度，默认为自动调整高度
    OkText: string, //确定按钮的文字，默认为"确定"
    CancelText: string, //取消按钮的文字，默认为"取消"
    IsOkDefault: bool, //确定按钮是否是默认按钮，默认为true
    IsCancelDefault: bool, //取消按钮是否是默认按钮，默认为false
    SizeToContent: string //内容填充模式，有效值：Manual，Width，Height，WidthAndHeight，默认为Manual
  }
  */
  mgDialog.ShowWindow = function (settings) {
    return "程序员努力研发中..."
  };
  //#endregion

  //#region mgStatus
  var mgStatus = function () {};
  /*
  设置状态栏状态信息
  message: string，状态栏内容
  progress：int，状态栏进度[0-100]，默认为0
  showSeconds：int，
  */
  mgStatus.SetStatusInfo = function (message, progress, showSeconds) {
    return "程序员努力研发中..."
  };
  /*
  将状态栏设置为默认状态
  */
  mgStatus.SetDefaultStatus = function () {
    return "程序员努力研发中..."
  }
  //#endregion

  //#region mgTip
  var mgTip = function () {};
  /*
  显示提示信息
  message: string，提示内容
  progress：int，进度[0-100]，默认为0
  */
  mgTip.Show = function (message, progress) {
    return "程序员努力研发中..."
  };
  /*
  关闭提示信息
  */
  mgTip.Close = function () {
    return "程序员努力研发中..."
  };
  //#endregion

  //#region  mgWeb
  var mgWeb = function () {};
  /*
  添加服务器端消息处理函数
  handlerKey: string, 处理函数的唯一标识符
  message: string，消息名称
  return: Promise<any> - 返回的数据类型为
  {
    MsgName: string, //消息名称
    Data: string //消息附加的数据
  }
  */
  mgWeb.AddWebMsgHandler = function (handlerKey, message) {
    return "程序员努力研发中..."
  };

  /*
  移除服务器端消息处理函数
  handlerKey: string, 处理函数的唯一标识符
  message: string，消息名称
  */
  mgWeb.RemoveWebMsgHandler = function (handlerKey, message) {
    return "程序员努力研发中..."
  };

  /*
  广播消息
  message: string, 消息名称
  content: any, 消息内容
  boardcastType: string，广播类型，可选值：None, Self, ProjectGroup, ProjectGroupOther, Other, All，默认为Self
  return: Promise<Result> - 返回广播是否成功
  */
  mgWeb.SendWebMsg = function (message, content, boardcastType) {
    return "程序员努力研发中..."
  };

  /*
  获取url
  apiPath: string，api地址
  urlParam：any，url参数
  return: Promise<string>
  */
  mgWeb.GetUrl = function (apiPath, urlParam) {
    urlParam = Object.prototype.toString.call(urlParam) == '[object Object]' ? urlParam : {};
    urlParam['UserToken'] = debugSetting.userToken;
    urlParam['ProjectId'] = urlParam['ProjectId'] == undefined ? debugSetting.projectId : urlParam['ProjectId'];
    urlParam['__platform_type'] = debugSetting.platformType;
    urlParam['__client_version'] = debugSetting.clientVersion;
    let params = mgDebug.joinParams(urlParam);
    let url = `${debugSetting.serverUrl}${apiPath}?${params}`
    return url
  };

  /*
  HTTP GET请求
  settings = {
    apiPath: string, //api地址，*必填
    urlParam: any, //url参数
    showProgress: bool //是否显示进度信息
  }
  return: Promise<Result> - 返回结果
  */

  mgWeb.GetResult = async function (settings) {
    let {
      urlParam,
      apiPath
    } = settings
    if (debugSetting.userToken == null) {
      await mgDebug.login();
    }
    let url = await mgWeb.GetUrl(apiPath, urlParam);
    return await mgDebug.Http(url, 'get');
  };
  /*
  HTTP POST请求
  settings = {
    apiPath: string, //api地址，*必填
    urlParam: any, //url参数
    files: string[], //待上传的文件路径集合
    showProgress: bool //是否显示进度信息
  }
  return: Promise<Result> - 返回结果
  */
  mgWeb.Post = async function (settings) {
    let {
      urlParam,
      apiPath
    } = settings
    if (debugSetting.userToken == null) {
      await mgDebug.login();
    }
    let url = await mgWeb.GetUrl(apiPath, urlParam);
    let params = mgDebug.joinParams(urlParam);
    return await mgDebug.Http(url, 'post', params);
  };
  //#endregion

  //#region  mgNavi
  var mgNavi = function () {};
  /*
  导航到指定页面
  address: string，内部地址或网址，*必填
  title: string，标题，可选
  data: any，其它需要传递的数据，可选
  */
  mgNavi.Go = function (address, title, data) {
    var href = window.location.href;

    if (href.indexOf('pages') > -1) {
      // 用于pages页面之间的跳转
      href = href.substring(0, href.indexOf('pages'));
      href = href + address;
      // console.log('href', href);
    } else {
      // 匹配最后一个'/'之后
      // console.log('match', href.match(/[^\/]+$/))
      let pathname = window.location.pathname.replace(/[^\/]+$/, address)
      href = window.location.origin + pathname
      // console.log('href', href);
    }
    let params = new URLSearchParams({
      urlData: JSON.stringify(data)
    });
    // console.log('params', params);
    // 获取查询参数
    // console.log('search', window.location.search == '')
    if (href.indexOf('?') > -1) {
      href += params
    } else {
      href = href + '?' + params
    }
    // console.log('href', href);
    // console.log('urlData = ', params.get('urlData'));
    window.location.href = href;


  };
  /*
  后退
  data: any，需要传递的数据，可选
  */
  mgNavi.GoBack = function (data) {
    // window.history.back()
    var href = document.referrer;
    var index = document.referrer.indexOf('?');
    if (href.indexOf('?') != -1)
      href = document.referrer.substring(0, index);

    let params = new URLSearchParams({
      urlData: JSON.stringify(data)
    });
    console.log('params', params);
    // 获取查询参数
    // console.log('search', window.location.search == '')
    if (href.indexOf('?') > -1) {
      href += params
    } else {
      href = href + '?' + params
    }
    window.location.href = href;
  };
  /*
  获取上一个页面传递过来的参数
  return: Promise<any> - 返回data
  */
  mgNavi.GetData = function () {
    // 获取url的查询参数
    let search = window.location.search.slice(1);
    // 获取urlData中的值
    let urlData = new URLSearchParams(search).get('urlData');
    return Promise.resolve(JSON.parse(urlData))
    // console.log('window.location.search', Promise.resolve(JSON.parse(urlData)));
  };
  //#endregion 

  //#region mgPage
  var mgPage = function () {};
  //页面加载后，宿主会设置该属性
  mgPage.Key = '';
  //页面加载后，宿主会调用该函数
  mgPage.OnLoaded = function (data) {
    return "程序员努力研发中..."
  };
  //页面出现后，宿主会调用该函数
  mgPage.OnAppearing = function (data) {
    return "程序员努力研发中..."
  };
  //页面消失后，宿主会调用该函数
  mgPage.OnDisappearing = function (data) {
    return "程序员努力研发中..."
  };
  //设置title
  mgPage.SetTitle = function (title) {
    return "程序员努力研发中..."
  };
  /*
  添加右上角菜单项
  text:string - 菜单标题，不能重复 *必填
  icon:string - 菜单图标 *必填
  callback: function - 点击该菜单项的回调函数 *必填
  */
  mgPage.AddMenuItem = function (text, icon, callback) {
    return "程序员努力研发中..."
  };

  /*
  移除右上角菜单项
  text:string - 待移除的菜单项标题 *必填
  */
  mgPage.RemoveMenuItem = function (text) {
    return "程序员努力研发中..."
  }

  /*
  对当前页面截图
  */
  mgPage.Capture = function () {
    return "程序员努力研发中..."
  }
  //#endregion

  //#region mgPlatform
  var mgPlatform = function () {};
  /*
  选择图片
  type: 0：所有类型 1：相册选取  2：前置摄像头   3：后置摄像头  -调取照片的方式
  return: Promise<string> - 返回图片的绝对路径
  */
  mgPlatform.PickPhoto = function (type) {
    return "程序员努力研发中..."
  };

  /*
  打开文件
  url: string - 文件路径，可以是网址，也可以是本地路径
  */
  mgPlatform.OpenFile = function (url) {
    return "程序员努力研发中..."
  }

  /*
  分享
  filePath: string - 分享的文件路径
  subject: string - 分享主题
  message: string - 分享内容
  */
  mgPlatform.Share = function (filePath, subject, message) {
    return "程序员努力研发中..."
  }

  /*
  读取指定路径的文件
  filePath: string - 文件的本地路径
  return Promise<string> - 返回文件二进制数据的Base64编码字符串
  */
  mgPlatform.ReadFile = function (filePath) {
    return "程序员努力研发中..."
  }

  /*
  保存数据至指定的文件
  filePath: string - 待保存的文件路径
  data: string - 文件的二进制数据的Base64编码字符串
  return Promise<bool> - 如果保存成功，返回true，否则，返回false
  */
  mgPlatform.SaveFile = function (filePath, data) {
    return "程序员努力研发中..."
  }


  /*
  拨打电话
  number: string - 电话号码
  */
  mgPlatform.TelNumber = function (number) {
    return "程序员努力研发中..."
  }

  /*
  清除缓存
  */
  mgPlatform.ClearCache = function () {
    return "程序员努力研发中..."
  }

  /*
  设置开发者模式
  enable: bool - 启动和关闭
  */
  mgPlatform.EnableDev = function (enable) {
    return "程序员努力研发中..."
  }


  /*
  设置链接地址
  address: string - ip地址
  */
  mgPlatform.DevConnection = function (address) {
    return "程序员努力研发中..."
  }

  /*
  退出登录
  reset: bool - 是否清空账号密码
  */
  mgPlatform.Logout = function (reset) {
    return "程序员努力研发中..."
  }

  /*
  保存数据至指定的文件
  return: Promise<IRecord> - 返回的数据类型为
  {
    Id: string, //项目id
    Name: string //项目名称
  }  
  */
  mgPlatform.SelectedProject = function () {
    return "程序员努力研发中..."
  };

  /*
  获取经纬度以及地址信息
  accuracy: int, 精度 Default = 0,Lowest = 1,Low = 2, Medium = 3,High = 4,Best = 5
  isAddress： bool, 维度
  return: Promise<IRecord> - 返回的数据类型为
  {
    Latitude: double, //纬度
    Longitude: double, //精度
    Address: string //地址信息
  }  
  */
  mgPlatform.GetLocation = function (accuracy, isAddress) {
    return "程序员努力研发中..."
  };

  /*
  打开地图显示定位点
  longitude: double, 精度
  latitude： double, 维度
  address: string, 地址
  type:int, 地图类型(0:百度地图，1：高德地图，2：腾讯地图，3：浏览器)
  return: Promise<bool> - 返回
  */
  mgPlatform.OpenMapView = function (longitude, latitude, address, type) {
    return "程序员努力研发中..."
  };


  /*
  读取开发者配置信息
  return: Promise<IRecord> - 返回的数据类型为
  {
  AgentAddress: string, //ip地址
  EnableMSDev: bool //是否开启开发者
  }
  */
  mgPlatform.GetSettingInfo = function () {
    return "程序员努力研发中..."
  }


  /*
  打开摄像头扫人脸
  */
  mgPlatform.SearchFace = function () {
    return "程序员努力研发中..."
  };

  /*
  人脸识别
  return: Promise<Result> - 返回的数据类型为
  {
  IsOK: bool, 
  Data: record 
  }
  */
  mgPlatform.VerifyFace = function () {
    return "程序员努力研发中..."
  };

  /*
  扫二维码功能
  */
  mgPlatform.ScanQrcode = function () {
    return "程序员努力研发中..."
  };

  /*
  确保文件可访问
  return: Promise<string>，返回可访问的路径
  */
  mgPlatform.MakeFileAccessible = function (filePath) {
    return "程序员努力研发中..."
  };
  //#endregion

  //#region mgWorkflow

  var mgWorkflow = function () {};
  /*
  创建任务
  firstStepFormType: string，流程的第一步骤的表单类型，*必填
  dataId: Id, 如果是重新打开未提交的数据，则需要传入该值，如果是全新创建，则不需要提供该数据，可选
  state：any，任意值，业务模块调用时可以传入该参数，表单在OnCreate接口处可以接收到，可选
  firstStepFormParam: string, 流程第一步骤的表单参数，用于过滤表单，可选
  */
  mgWorkflow.Create = function (firstStepFormType, dataId, state, firstStepFormParam) {
    return "程序员努力研发中..."
  };

  /*
  显示指定数据项的任务详情
  dataId: Id, 数据项Id
  */
  mgWorkflow.ShowTaskDetail = function (dataId) {
    return "程序员努力研发中..."
  }

  /*
  指定的数据项是否在工作流中存在
  dataId: Id, 数据项Id
  return bool
  */
  mgWorkflow.IsExist = function (dataId) {
    return "程序员努力研发中..."
  }

  /*
  批量获取数据的审批状态
  dataIds: Id[]，数据项Id数组
  return Dictionary<Id, TaskStatus>
  */
  mgWorkflow.GetDataStatus = function (dataIds) {
    return "程序员努力研发中..."
  }

  /*
  根据数据Id获取任务信息
  dataIds: Id[], 数据项Id数组
  return Dictionary<Id, IRecord[]>
  ---任务IRecord的详细信息如下：
  {
     "_id": "ObjectId", //任务Id
     "InstanceId": "ObjectId", //实例Id
     "StepName": "string", //当前步骤名称
     "Title": "string", //任务标题
     "Receive": { //接收人
           "_id": "ObjectId", //用户Id
           "Email": "xxx@qq.com", //邮箱
           "PhoneNumber": "(86)136xxxxxxxx", //手机号
           "RealName": "超级管理员" //真实姓名
     },
     "ReceiveTime": "/Date/" //接收时间
  }
  */
  mgWorkflow.GetDataCurrentTasks = function (dataIds) {
    return "程序员努力研发中..."
  }
  //#endregion

  //#region mgTaskForm
  //***************************************************************************************************
  var mgTaskForm = function () {};
  /*
  注册表单
  formType: string，表单类型，*必填
  url: string，表单的链接，*必填
  */
  mgTaskForm.Register = function (formType, url) {
    return "程序员努力研发中..."
  };
  //#endregion 

  //#region mgForm 表示当前表单
  var mgForm = function () {};
  /*
  设置当前表单的属性
  key: string, 属性名，可选为：title,isReadonly,height,result
  value: any，属性值，对应类型：string,bool,double,FormData
  */
  mgForm.Set = function (key, value) {
    return "程序员努力研发中..."
  }

  /*
  重新调整表单大小
  */
  mgForm.Resize = function () {
    console.debug('mgForm.Reize - body height:' + document.body.clientHeight);
    mgForm.Set('height', document.body.clientHeight);
    return "程序员努力研发中..."
  }
  //#endregion

  //#region mgApi 表示通用的API

  var mgApi = function () {};
  /*
  上传文件
  filePath: string, *必填 文件路径
  fileId: Id, 选填，文件Id，如果为null，则表示新增文件，如果不为null，则表示更新文件
  showProgress: bool, 选填，是否显示进度条，默认为false
  alertError: bool, 如果上传出错，是否弹出错误提示框，默认为false
  return Promise<FileRecord>
  */
  mgApi.UploadFile = function (filePath, fileId, showProgress, alertError) {
    return "程序员努力研发中..."
  }

  /*
  下载文件
  fileId: Id, *必填，文件Id，如果为null，则表示新增文件，如果不为null，则表示更新文件
  version: int, 选填，文件版本号，默认为-1，表示最新版本
  showProgress: bool, 选填，是否显示进度条，默认为false
  return Promise<string> 返回文件路径
  */
  mgApi.DownloadFile = function (fileId, version, showProgress) {
    return "程序员努力研发中..."
  }
  //#endregion

  //#region 通用函数
  /*
  返回时间的Ticks
  date: Date，时间
  */
  function mgDateToTicks(date) {
    return ((date.getTime() * 10000) + 621355968000000000);
  }
  //#endregion

  /********************************** 分割线 **********************************************/

  //#region  调试模式下的方法
  var mgDebug = function () {}

  mgDebug.SetAccount = function (serverUrl, userName, password) {
    debugSetting.serverUrl = serverUrl;
    debugSetting.userName = userName;
    debugSetting.password = password;
  }

  mgDebug.Http = async function (url, method, params) {
    var fetchParams = {
      method: method
    }
    if (method == "post") {
      fetchParams.headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      fetchParams.body = params;
    }
    var promise = new Promise((resolve, reject) => {
      fetch(url, fetchParams).then(response => {
        if (response.status !== 200) {
          console.log(`返回的响应码${response.status}`);
          return;
        }
        // 获得后台实际返回的内容
        response.json().then(function (data) {
          resolve(data);
        });
      }).catch(err => {
        reject(err);
      })
    })
    return promise;
  }

  /**
   * @description: 拼接参数
   * @param {*} obj
   * @param {*} array
   * @param {*} index
   * @return {*}
   */
  mgDebug.joinParams = function (obj, array = [], index = 0) {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        obj[key] = JSON.stringify(obj[key])
        // console.log(obj[key])
      }
      // var params = new URLSearchParams([["foo", 1],["bar", 2]]);
      //设置URLSearchParams传入数组格式为[[参数名1：参数值1],[参数名2：参数值2]]
      array[index] = [key, obj[key]]
      index = index + 1;
    }
    return new URLSearchParams(array).toString()

  }
  /**
   * @description: 用户登录
   * @param {*}
   * @return {*}
   */
  mgDebug.getTokenKey = async function (settings) {
    let {
      urlParam,
      apiPath
    } = settings
    urlParam = Object.prototype.toString.call(urlParam) == '[object Object]' ? urlParam : {};
    let params = mgDebug.joinParams(urlParam);
    let url = `${debugSetting.serverUrl}${apiPath}?${params}`;
    return await mgDebug.Http(url, 'get');
  };
  /**
   * 登录方法
   * @returns 
   */
  mgDebug.login = async function () {
    let params = {
      apiPath: "v1/sys/user/login",
      urlParam: {
        AppKey: debugSetting.appKey,
        UserName: debugSetting.userName,
        Password: debugSetting.password
      }
    }
    let result = await mgDebug.getTokenKey(params)
    if (!result.IsOk) {
      alert("登录失败：" + result.Message);
      return;
    }
    debugSetting.userInfo = result.Data
    debugSetting.tokenKey = result.Data.TokenKey
    //返回的tokenKey,根据返回的tokenKey获取userToken,把userToken赋值到debug配置里面
    let tokenParams = {
      apiPath: "v1/sys/user/token",
      urlParam: {
        AppKey: debugSetting.appKey,
        TokenKey: debugSetting.tokenKey
      }
    }
    let {
      urlParam,
      apiPath
    } = tokenParams
    urlParam = Object.prototype.toString.call(urlParam) == '[object Object]' ? urlParam : {};
    params = mgDebug.joinParams(urlParam);
    url = `${debugSetting.serverUrl}${apiPath}?${params}`;
    result = await mgDebug.Http(url, 'get');
    if (!result.IsOk) {
      alert("登录失败：" + result.Message);
      return;
    }
    debugSetting.userToken = result.Data.UserToken;
  }
  //#endregion



  //#region javascript封装的mango.js
  //***************************************************************************************************
  //通用函数
  //***************************************************************************************************

  /*
  返回时间的Ticks
  date: Date，时间
  */
  function mgDateToTicks(date) {
    return ((date.getTime() * 10000) + 621355968000000000);
  }

}