import Vue from 'vue'
import {
  Button, Tabbar, TabbarItem,
  NavBar, Icon, NoticeBar,
  Cell, CellGroup, Field,
  Picker, Popup, Area,
  Search, PullRefresh, Toast,
  tag, Lazyload, Circle,
  ActionSheet, SwitchCell, Divider,
  Tab, Tabs, ImagePreview,
  Image, SwipeCell, Uploader,
  Dialog, Sidebar, SidebarItem,
  DatetimePicker, List, Notify,
  IndexBar, IndexAnchor, Skeleton,
  Swipe, SwipeItem, DropdownMenu,
  DropdownItem, Panel, sticky,
  Loading, Stepper, Grid, GridItem,
  Slider
} from 'vant'

Vue.use(Button).use(Tabbar).use(TabbarItem)
Vue.use(NavBar).use(Icon).use(NoticeBar)
Vue.use(Cell).use(CellGroup).use(Field)
Vue.use(Picker).use(Popup).use(Area)
Vue.use(Search).use(PullRefresh).use(Toast)
Vue.use(tag).use(Lazyload).use(Circle)
Vue.use(ActionSheet).use(SwitchCell).use(Divider)
Vue.use(Tab).use(Tabs).use(ImagePreview)
Vue.use(Image).use(SwipeCell).use(Uploader)
Vue.use(Dialog).use(Sidebar).use(SidebarItem)
Vue.use(DatetimePicker).use(List).use(Notify)
Vue.use(IndexBar).use(IndexAnchor).use(Skeleton)
Vue.use(Swipe).use(SwipeItem).use(DropdownMenu)
Vue.use(DropdownItem).use(Panel).use(sticky)
Vue.use(Loading).use(Stepper).use(Grid).use(GridItem)
Vue.use(Slider)

Vue.prototype.$ImagePreview = ImagePreview
