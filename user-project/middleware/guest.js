export default function (ctx,req,res,next) {
    if (ctx.app.$auth.$state.loggedIn) {
        return ctx.redirect('/')
    }
    if(ctx.route.fullPath === '/**') {
      return ctx.redirect("/404");
    }
  }
