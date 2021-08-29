export default function (ctx,req,res,next) {

  console.log("param",params)
      debugger
  if(ctx.route.params === '/**') {
    return ctx.redirect("/404");
  }
}
