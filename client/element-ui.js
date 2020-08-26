import {
  Pagination,
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Button,
  Table,
  Form,
  FormItem,
  Tag,
  Tree,
  Row,
  Col,
  Main,
  Card,
  Timeline,
  TimelineItem,
  Avatar,
  Link,
  Loading,
  MessageBox,
  Message,
} from 'element-ui'

export const elementUse = Vue => {
  Vue.use(Pagination)
  Vue.use(Dialog)
  Vue.use(Menu)
  Vue.use(Submenu)
  Vue.use(MenuItem)
  Vue.use(MenuItemGroup)
  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Table)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Tag)
  Vue.use(Tree)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Main);
  Vue.use(Link)
  Vue.use(Timeline);
  Vue.use(TimelineItem);
  Vue.use(Card);
  Vue.use(Avatar);
  Vue.use(Loading.directive)

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$message = Message
}
