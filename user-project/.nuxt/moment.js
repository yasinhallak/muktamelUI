import moment from 'moment'

import 'moment/locale/ar'

moment.locale('ar')

export default (ctx, inject) => {
  ctx.$moment = moment
  inject('moment', moment)
}
