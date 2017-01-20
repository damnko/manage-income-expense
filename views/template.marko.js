function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __renderer = __helpers.r,
      ___node_modules_marko_node_modules_marko_layout_placeholder_tag_js = __renderer(require("marko/node_modules/marko-layout/placeholder-tag")),
      __tag = __helpers.t;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><title>');
    __tag(out,
      ___node_modules_marko_node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "title",
        "content": data.layoutContent
      });

    out.w('</title><link href="vendor/bootstrap-3.3.6-dist/css/bootstrap.min-custom.css" rel="stylesheet"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"><!--[if lt IE 9]>\n      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>\n      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>\n    <![endif]-->');
    __tag(out,
      ___node_modules_marko_node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "css",
        "content": data.layoutContent
      });

    out.w('<link href="stylesheets/style.css" rel="stylesheet"></head><body>');
    __tag(out,
      ___node_modules_marko_node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "body",
        "content": data.layoutContent
      });

    out.w('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script><script src="vendor/bootstrap-3.3.6-dist/js/bootstrap.min.js"></script>');
    __tag(out,
      ___node_modules_marko_node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "custom-js",
        "content": data.layoutContent
      });

    out.w('</body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);