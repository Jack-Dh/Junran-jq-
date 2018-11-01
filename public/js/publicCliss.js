var interfaceUrl = 'http://jiajiachuang.cn/junran' //接口前缀
var token = $.cookie('token')//获取存在cookie中的token

var login='http://jiajiachuang.cn/junran/manage/login' //登录接口

var addAdmin = '/manage/operator/upsert'//添加管理员

var adminList = '/manage/operator/search'//管理员列表

var updataAdmin = '/manage/operator/upsert'//修改管理员

var wxfansList = 'http://jiajiachuang.cn/junran/manage/user/search'//微信粉丝列表

var wxfansLabel = '/manage/user/updateTag'//微信粉丝添加标签

var wxfigureList = '/manage/wxsetting/get'//微信端首页轮播图列表

var uploadImg = '/manage/keUpload'//系统的活动上传图片

var redEnvelopeList = '/manage/redpack/list?'//红包查询

var addCti = '/manage/activity/upsert'//创建活动

var CtiList = '/manage/activity/search'//活动列表

var EventDetails = '/manage/activity/get?'//活动详情

var CtiStartEnd = '/manage/activity/able'//活动暂停启用

var addRedEbvelope = '/manage/redpack/upsert'//添加红包

var redList = '/manage/redpack/search'//红包列表，分页查询

var redEbvelopDetail = '/manage/redpack/get?'//红包详情

var redEbvelopStartEnd = '/manage/redpack/able'//红包暂停启用

var ctiReview = '/manage/useractivity/search'//活动审核列表

var ctiOperation = '/manage/useractivity/get'//对单条活动查询

var ctiThrough = '/manage/useractivity/pass'//活动通过

var ctiRefused = '/manage/useractivity/reject'//活动拒绝

var redIssueList = '/manage/useractivity/search'//红包发放列表

var redIssue = '/manage/useractivity/sendRedPack'//发送红包

var wxSet = '/manage/wxsetting/upsert' //微信设置

var editorLabel='http://jiajiachuang.cn/junran/manage/user/usertag/upsert'//新增编辑用户标签

var labelList='http://jiajiachuang.cn/junran/manage/user/usertag/list'//查询所有标签

var operationLog='http://jiajiachuang.cn/junran/manage/operatorlog/search'//操作日志

var refreshSet='http://jiajiachuang.cn/junran/manage/wxsetting/refreshMenus'//刷新公众号菜单设置

var refreshFans='http://jiajiachuang.cn/junran/manage/wxsetting/refreshWxUser'//刷新公众号粉丝









