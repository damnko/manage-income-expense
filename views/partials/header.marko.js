function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      attr = __helpers.a;

  return function render(data, out) {
    out.w('<nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="#">Previsione P.IVA</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"><ul class="nav navbar-nav"><li' +
      attr("class", (data.title=='finance') ? 'active' : '') +
      '><a href="/finance">Finance</a></li><li' +
      attr("class", (data.title=='reports') ? 'active' : '') +
      '><a href="/reports">Reports</a></li></ul><ul class="nav navbar-nav navbar-right">');

    if (data.isAuth) {
      out.w('<li><a href="/logout">Logout</a></li>');
    }

    out.w('</ul></div></div></nav>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);