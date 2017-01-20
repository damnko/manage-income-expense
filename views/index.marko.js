function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      __template_marko = __loadTemplate(require.resolve("./template.marko"), require),
      __renderer = __helpers.r,
      ___node_modules_marko_node_modules_marko_layout_use_tag_js = __renderer(require("marko/node_modules/marko-layout/use-tag")),
      __tag = __helpers.t,
      ___node_modules_marko_node_modules_marko_layout_put_tag_js = __renderer(require("marko/node_modules/marko-layout/put-tag")),
      escapeXml = __helpers.x;

  return function render(data, out) {
    __tag(out,
      ___node_modules_marko_node_modules_marko_layout_use_tag_js,
      {
        "template": __template_marko,
        "getContent": function(__layoutHelper) {
          __tag(out,
            ___node_modules_marko_node_modules_marko_layout_put_tag_js,
            {
              "into": "title",
              "layout": __layoutHelper
            },
            function(out) {
              out.w(escapeXml(data.title));
            });
          __tag(out,
            ___node_modules_marko_node_modules_marko_layout_put_tag_js,
            {
              "into": "body",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<div class="container"><div class="row"><div class="col-md-12"><h1>Stima costi p.iva</h1><p>Programmino di prova per provare le funzionalita\' di express e stimare le spese\ndi una p.iva regime dei\nminimi.</p><button class="btn btn-block btn-success" data-toggle="modal" data-target="#login">Login</button><button class="btn btn-block btn-default" data-toggle="modal" data-target="#register">Registrati</button><div id="login" class="modal fade" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Login</h4></div><div class="modal-body"><form action="/login" method="get" id="loginForm"><div class="alert alert-danger formErrors"><ul><li>Errore form</li><li>Errore form</li></ul></div><div class="form-group"><label for="exampleInputEmail1">Email address</label><input type="email" class="form-control" id="email" name="email" placeholder="Email"></div><div class="form-group"><label for="exampleInputPassword1">Password</label><input type="password" class="form-control" id="password" name="password" placeholder="Password"></div><button type="submit" class="btn btn-success">Login</button></form></div><div class="modal-footer"><button type="button" class="btn btn-default btn-block" data-dismiss="modal">Close</button></div></div></div></div><div id="register" class="modal fade" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Registrazione</h4></div><div class="modal-body"><form action="/register" method="post" id="registrationForm"><div class="alert alert-danger formErrors"><ul><li>Errore form</li><li>Errore form</li></ul></div><div class="form-group"><label for="exampleInputEmail1">Email address</label><input type="email" class="form-control" id="email" name="email" placeholder="Email"></div><div class="form-group"><label for="exampleInputEmail1">Conferma email address</label><input type="email" class="form-control" id="emailControl" name="emailControl" placeholder="Email"></div><div class="form-group"><label for="exampleInputPassword1">Password</label><input type="password" class="form-control" id="password" name="password" placeholder="Password"></div><button type="submit" class="btn btn-success">Registrati</button></form></div><div class="modal-footer"><button type="button" class="btn btn-default btn-block" data-dismiss="modal">Close</button></div></div></div></div></div></div></div>');
            });
          __tag(out,
            ___node_modules_marko_node_modules_marko_layout_put_tag_js,
            {
              "into": "custom-js",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<script src="vendor/validate/validate.min.js"></script><script>\n\t\t\tvar presenceMsg = \'obbligatoria\';\n\t\t\tvar registration = {\n\t\t\t  email: {\n\t\t\t    presence: {\n\t\t\t\t\tmessage: presenceMsg\n\t\t\t    },\n\t\t\t    email: {\n\t\t\t    \tmessage: "L\'email non sembra essere valida"\n\t\t\t    }\n\t\t\t  },\n\t\t\t  emailControl: {\n\t\t\t  \tpresence: {\n\t\t\t\t\tmessage: presenceMsg\n\t\t\t    },\n\t\t\t    equality: {\n\t\t\t    \tattribute: \'email\',\n\t\t\t    \tmessage: \'Le due email non sono uguali\'\n\t\t\t    }\n\t\t\t  },\n\t\t\t  password: {\n\t\t\t  \tpresence: {\n\t\t\t\t\tmessage: presenceMsg\n\t\t\t    },\n\t\t\t  \tlength: {\n\t\t\t  \t\tminimum: 8,\n\t\t\t  \t\ttooShort: "La password deve essere di almeno %{count} caratteri"\n\t\t\t  \t}\n\t\t\t  }\n\t\t\t};\n\t\t\tvar login = {\n\t\t\t  email: {\n\t\t\t    presence: {\n\t\t\t\t\tmessage: presenceMsg\n\t\t\t    }\n\t\t\t  },\n\t\t\t  password: {\n\t\t\t  \tpresence: {\n\t\t\t\t\tmessage: presenceMsg\n\t\t\t    }\n\t\t\t  }\n\t\t\t};\n\n\t\t\t// Registration validation\n\t\t\t$(\'#registrationForm\').on(\'submit\', function(ev){\n\t\t\t\tev.preventDefault();\n\t\t\t\thandleFormSubmit(this,registration);\n\t\t\t});\n\t\t\t// Login validation\n\t\t\t$(\'#loginForm\').on(\'submit\', function(ev){\n\t\t\t\tev.preventDefault();\n\t\t\t\thandleFormSubmit(this,login);\n\t\t\t});\n\n\t\t\t// Check for errors on the form\n\t\t\tfunction handleFormSubmit(form, validation){\n\t\t\t\tvar errors = validate(form, validation);\n\t\t\t\tvar formElement = $(\'#\' + form.id);\n\t\t\t\tif (!errors)\n\t\t\t\t\tshowSuccess(formElement);\n\t\t\t\telse\n\t\t\t\t\tshowErrors(formElement, errors);\n\n\t\t\t\tconsole.log(errors);\n\t\t\t}\n\n\t\t\t// Show errors \n\t\t\tfunction showErrors(formElement, errors){\n\t\t\t\tconsole.log(\'found errors in form\');\n\t\t\t\t// Clean the form from errors\n\t\t\t\tcleanForm(formElement);\n\t\t\t\t// Attach new errors\n\t\t\t\tappendErrors(formElement, errors);\n\t\t\t}\n\n\t\t\t// Append errors to form\n\t\t\tfunction appendErrors(formElement, errors){\n\t\t\t\t// Cycle all errors\n\t\t\t\tfor (error in errors){\n\t\t\t\t\t// Add error class to form-group\n\t\t\t\t\tvar formGroup = formElement.find(\'[name="\' + error +\'"]\').closest(\'.form-group\');\n\t\t\t\t\tformGroup.addClass(\'has-error\');\n\n\t\t\t\t\t// Cycle through the errors and attach error span\n\t\t\t\t\tvar errArr = errors[error];\n\t\t\t\t\tvar errEl = \'<span class="help-block"><ul><li>\' + errArr.join(\'</li><li>\') + \'</li></ul></span>\';\n\t\t\t\t\tformGroup.append(errEl);\n\n\t\t\t\t\tconsole.log(\'aggiunto errore a \' + error + \' il valore sarebbe \' + errors[error]);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Removes errors and classes from form\n\t\t\tfunction cleanForm(formElement){\n\t\t\t\t// Remove all error styles\n\t\t\t\tformElement.find(\'.has-error\').removeClass(\'has-error\');\n\t\t\t\t// Remove all error messages\n\t\t\t\tformElement.find(\'.help-block\').remove();\n\t\t\t}\n\n\t\t\t// Form submit handle\n\t\t\tfunction showSuccess(formElement){\n\t\t\t\tconsole.log(\'no errors in form\');\n\n\t\t\t\tcleanForm(formElement);\n\t\t\t\t// Send the form to server\n\t\t\t\tvar initialText = formElement.find(\':submit\').text();\n\t\t\t\t$.ajax({\n\t\t\t\t\turl: formElement.attr(\'action\'),\n\t\t\t\t\ttype: \'POST\',\n\t\t\t\t\tdata: {\n\t\t\t\t\t\temail: formElement.find(\'[name="email"]\').val(),\n\t\t\t\t\t\tpassword: formElement.find(\'[name="password"]\').val()\n\t\t\t\t\t},\n\t\t\t\t\tdataType: \'json\',\n\t\t\t\t\tbeforeSend: function(){\n\t\t\t\t\t\tformElement.find(\'.formErrors\').hide();\n\t\t\t\t\t\tformElement.find(\':submit\')\n\t\t\t\t\t\t\t.addClass(\'disabled\')\n\t\t\t\t\t\t\t.removeClass(\'btn-default\')\n\t\t\t\t\t\t\t.addClass(\'btn-warning\')\n\t\t\t\t\t\t\t.text(\'Registrazione in corso...\');\n\t\t\t\t\t},\n\t\t\t\t\tsuccess: function(json){\n\t\t\t\t\t\tconsole.log(\'json risposta ajax\', json);\n\t\t\t\t\t\t// Check for errors\n\t\t\t\t\t\tif (json.errors){\n\t\t\t\t\t\t\t// Append error messages\n\t\t\t\t\t\t\tformElement.find(\'.formErrors ul\').html(\'<li>\' + json.errors.join(\'</li><li>\') + \'</li>\');\n\t\t\t\t\t\t\t// Show error div\n\t\t\t\t\t\t\tformElement.find(\'.formErrors\').slideDown();\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tformElement.find(\':submit\')\n\t\t\t\t\t\t\t\t.removeClass(\'disabled\')\n\t\t\t\t\t\t\t\t.removeClass(\'btn-warning\')\n\t\t\t\t\t\t\t\t.addClass(\'btn-default\')\n\t\t\t\t\t\t\t\t.text(initialText);\n\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t// Restore previous text\n\t\t\t\t\t\tformElement.find(\':submit\').text(\'Redirecting to personal page...\');\n\t\t\t\t\t\tlocation.assign(\'/finance\');\n\t\t\t\t\t\t// window.location(\'/personalArea\');\n\t\t\t\t\t},\n\t\t\t\t\terror: function(xh,status,error){\n\t\t\t\t\t\tconsole.log(\'error xh\', xh);\n\t\t\t\t\t\t// xh.status = 401 = login fallito\n\t\t\t\t\t\tconsole.log(\'error status\', status);\n\t\t\t\t\t\tconsole.log(\'error error\', error);\n\t\t\t\t\t}\n\t\t\t\t})\n\n\t\t\t\tconsole.log(\'form completato\');\n\t\t\t}\n\t\t</script>');
            });
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);