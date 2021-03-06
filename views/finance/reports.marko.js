function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      ___template_marko = __loadTemplate(require.resolve("../template.marko"), require),
      ___partials_header_marko = __loadTemplate(require.resolve("../partials/header.marko"), require),
      __renderer = __helpers.r,
      ______node_modules_marko_node_modules_marko_layout_use_tag_js = __renderer(require("marko/node_modules/marko-layout/use-tag")),
      __tag = __helpers.t,
      ______node_modules_marko_node_modules_marko_layout_put_tag_js = __renderer(require("marko/node_modules/marko-layout/put-tag")),
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      attr = __helpers.a;

  return function render(data, out) {
    __tag(out,
      ______node_modules_marko_node_modules_marko_layout_use_tag_js,
      {
        "template": ___template_marko,
        "getContent": function(__layoutHelper) {
          __tag(out,
            ______node_modules_marko_node_modules_marko_layout_put_tag_js,
            {
              "into": "title",
              "layout": __layoutHelper
            },
            function(out) {
              out.w(escapeXml(data.title));
            });
          __tag(out,
            ______node_modules_marko_node_modules_marko_layout_put_tag_js,
            {
              "into": "body",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<div class="container"><div class="row"><div class="col-md-12">');
              __helpers.i(out, ___partials_header_marko, {"title": data.title});

              out.w('</div></div></div> <div class="container"><div class="row"><div class="col-md-12"><h1>Summary</h1></div></div><div class="row"><div class="col-md-12"><form action method="get" id="filters"><div class="form-group"><label for="exampleInputEmail1">Anno</label><select class="form-control" name="year">');

              forEach(data.years, function(year) {
                out.w('<option' +
                  attr("value", year.date) +
                  '>' +
                  escapeXml(year.date) +
                  '</option>');
              });

              out.w('</select></div></form></div></div><div class="row"><div class="col-sm-6 realStandard"><h2>Real only [standard]</h2><table class="table summary"><tbody><tr class="in"><td><strong>Incassi</strong><p class="income"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Spese detraibili</strong><p class="expense"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="res"><td><strong>= Base imponibile</strong><p class="imponibile"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Inps aggiuntivo</strong><p class="inps"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Imposte 5%</strong><p class="imposte"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="res"><td><strong>= Reddito netto disponibile</strong><p class="netto"><i class="fa fa-refresh fa-spin"></i></p></td></tr></tbody></table></div><div class="col-sm-6 realCashout"><h2>Real only [cashout]</h2><table class="table summary"><tbody><tr class="in"><td><strong>Incassi</strong><p class="income"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Spese detraibili</strong><p class="expense"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="res"><td><strong>= Base imponibile</strong><p class="imponibile"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Inps aggiuntivo</strong><p class="inps"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Imposte 5%</strong><p class="imposte"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="res"><td><strong>= Reddito netto disponibile</strong><p class="netto"><i class="fa fa-refresh fa-spin"></i></p></td></tr></tbody></table></div></div> <div class="row"><div class="col-md-12 realSave"><div class="alert alert-success" role="alert"><strong>Risparmio real: </strong><br><span></span></div></div></div><div class="row"><div class="col-sm-6 realFakeStandard"><h2>Real + Fake [standard]</h2><table class="table summary"><tbody><tr class="in"><td><strong>Incassi</strong><p class="income"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Spese detraibili</strong><p class="expense"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="res"><td><strong>= Base imponibile</strong><p class="imponibile"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Inps aggiuntivo</strong><p class="inps"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Imposte 5%</strong><p class="imposte"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="res"><td><strong>= Reddito netto disponibile</strong><p class="netto"><i class="fa fa-refresh fa-spin"></i></p></td></tr></tbody></table></div><div class="col-sm-6 realFakeCashout"><h2>Real + Fake [cashout]</h2><table class="table summary"><tbody><tr class="in"><td><strong>Incassi</strong><p class="income"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Spese detraibili</strong><p class="expense"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="res"><td><strong>= Base imponibile</strong><p class="imponibile"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Inps aggiuntivo</strong><p class="inps"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="out"><td><strong>- Imposte 5%</strong><p class="imposte"><i class="fa fa-refresh fa-spin"></i></p></td></tr><tr class="res"><td><strong>= Reddito netto disponibile</strong><p class="netto"><i class="fa fa-refresh fa-spin"></i></p></td></tr></tbody></table></div></div> <div class="row"><div class="col-md-12 realFakeSave"><div class="alert alert-success" role="alert"><strong>Risparmio real+fake: </strong><br><span></span></div></div></div><div class="row"><div class="col-md-12" id="incassiTotali"><h1>Incassi totali (max 30k)</h1><p class="missing hidden">Attualmente mancano <span></span>\u20ac per arrivare alla soglia di 30k</p><div class="alert alert-danger hidden" role="alert"><strong>Attenzione, si sta superando il limite di </strong><br><span></span></div><div class="progress"><div class="progress-bar progress-bar-success" style="width: 0%"></div><div class="progress-bar progress-bar-warning" style="width: 0%"></div></div></div></div><div class="row"><div class="col-md-12" id="maxExpense"><h1>Beni strumentali (max 15k/3anni)</h1><p class="missing hidden">Attualmente mancano <span></span>\u20ac per arrivare alla soglia di 15k</p><div class="alert alert-danger hidden" role="alert"><strong>Attenzione, si sta superando il limite di </strong><br><span></span></div><div class="progress"><div class="progress-bar progress-bar-success" style="width: 0%"></div><div class="progress-bar progress-bar-warning" style="width: 0%"></div></div></div></div></div> ');
            });
          __tag(out,
            ______node_modules_marko_node_modules_marko_layout_put_tag_js,
            {
              "into": "custom-js",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<script>\n            $(function(){\n\n                var realSummary;\n                var realFakeSummary;\n                function getSummary(type, callout){\n                    $.ajax({\n                        url: \'/reports/get-stats\',\n                        type: \'get\',\n                        dataType: \'json\',\n                        data: {\n                            q: type,\n                            y: $(\'#filters select\').val()\n                        },\n                        beforeSend: function(){\n                            console.log(\'asking \' + type + \' reports...\');\n                        },\n                        success: function(reports){\n                            if (\'error\' in reports){\n                                console.warn(\'error \' + type, reports.error);\n                                return true;\n                            }\n                            console.log(type + \' reports received: \', reports);\n\n                            var target = $(\'.\' + type + \'Standard\');\n                            var targetObj = reports.stdSummary;\n                            printSummary(targetObj, target);\n\n                            var target = $(\'.\' + type + \'Cashout\');\n                            var targetObj = reports.cashoutSummary;\n                            printSummary(targetObj, target);\n\n                            var perc = {};\n                            var num = {};\n                            for (field in reports.stdSummary){\n                                perc[field] = ((reports.cashoutSummary[field]/reports.stdSummary[field])-1)*100;\n                                num[field] = reports.cashoutSummary[field]-reports.stdSummary[field];\n                            }\n\n                            if (type === \'real\'){\n                                realSummary = {\n                                    std: reports.stdSummary,\n                                    cashout: reports.cashoutSummary\n                                }\n                            }else{\n                                realFakeSummary = {\n                                    std: reports.stdSummary,\n                                    cashout: reports.cashoutSummary\n                                }\n                                console.log(\'realSummary\', realSummary);\n                                var val = {\n                                    realFakeCashout: {},\n                                    realFakeStandard: {}\n                                };\n                                for (field in reports.stdSummary){\n                                    // console.log(\'reports.cashoutSummary[field]\', reports.cashoutSummary[field]);\n                                    // console.log(\'realSummary.cashout[field]\', realSummary.cashout[field]);\n                                    // console.log(\'reports.stdSummary[field]\', reports.stdSummary[field]);\n                                    // console.log(\'realSummary.stdSummary[field]\', realSummary.std[field]);\n                                    var perc1 = ((reports.cashoutSummary[field]/realSummary.cashout[field])-1)*100;\n                                    var num1 = reports.cashoutSummary[field]-realSummary.cashout[field];\n                                    val.realFakeCashout[field] = diffValueSpan(perc1,num1);\n                                    var perc1 = ((reports.stdSummary[field]/realSummary.std[field])-1)*100;\n                                    var num1 = reports.stdSummary[field]-realSummary.std[field];\n                                    val.realFakeStandard[field] = diffValueSpan(perc1,num1);\n                                }\n                                console.log(\'val\', val);\n                            }\n\n                            target.find(\'.income\').append(diffValue(perc.incassi,num.incassi));\n                            target.find(\'.expense\').append(diffValue(perc.spese,num.spese));\n                            target.find(\'.imponibile\').append(diffValue(perc.baseImponibile,num.baseImponibile));\n                            target.find(\'.inps\').append(diffValue(perc.inpsAddizionale,num.inpsAddizionale));\n                            target.find(\'.imposte\').append(diffValue(perc.imposte,num.imposte));\n                            target.find(\'.netto\').append(diffValue(perc.redditoNetto,num.redditoNetto));\n                            console.log(\'diff\', perc);\n\n                            if (type !== \'real\'){\n                                var arr = [\'realFakeCashout\', \'realFakeStandard\'];\n                                arr.forEach(function (type){\n                                    $(\'.\' + type).find(\'.income\').append(val[type].incassi);\n                                    $(\'.\' + type).find(\'.expense\').append(val[type].spese);\n                                    $(\'.\' + type).find(\'.imponibile\').append(val[type].baseImponibile);\n                                    $(\'.\' + type).find(\'.inps\').append(val[type].inpsAddizionale);\n                                    $(\'.\' + type).find(\'.imposte\').append(val[type].imposte);\n                                    $(\'.\' + type).find(\'.netto\').append(val[type].redditoNetto);\n                                })\n                                callout();\n                            }\n\n                            $(\'.\' + type + \'Save span\').text(reports.risparmio + \' \u20ac\');\n\n                            \n                        }\n                    })\n                }\n\n                function diffValue(perc, num){\n                    return \' <sup>(\' + Math.round(perc) + \'%) (\' + Math.round(num * 100)/100 + \'\u20ac)</sup>\';\n                }\n                function diffValueSpan(perc, num){\n                    return \' <span class="diff">(\' + Math.round(perc) + \'%) (\' + Math.round(num * 100)/100 + \'\u20ac)</span>\';\n                }\n\n                function printSummary(targetObj, target){\n                    target.find(\'.income\').text(targetObj.incassi + \' \u20ac\');\n                    target.find(\'.expense\').text(targetObj.spese + \' \u20ac\');\n                    target.find(\'.imponibile\').text(targetObj.baseImponibile + \' \u20ac\');\n                    target.find(\'.inps\').text(targetObj.inpsAddizionale + \' \u20ac\');\n                    target.find(\'.imposte\').text(targetObj.imposte + \' \u20ac\');\n                    target.find(\'.netto\').text(targetObj.redditoNetto + \' \u20ac\');\n                }\n\n                function init(){\n                    getSummary(\'real\', null);\n                    getSummary(\'realFake\', function(){\n                        console.log(\'chiamo xxxx\');\n                        maxIncome();\n                    });\n                }\n                init();\n\n                $(\'#filters select\').on(\'change\', function(ev){\n                    init();\n                })\n\n                // calculate the 30k income limit\n                function maxIncome(){\n                    var income = realSummary.std.incassi;\n                    var fake = realFakeSummary.std.incassi - realSummary.std.incassi;\n                    var diff = income + fake - 30000;\n                    var over = (diff > 0) ? diff : 0;\n\n                    // calcolo il totale che sara\' il mio 100%\n                    if (diff > 0){\n                        var tot = income+fake;\n                        if (!$(\'#incassiTotali .missing\').hasClass(\'hidden\'))\n                            $(\'#incassiTotali .missing\').addClass(\'hidden\');\n                        $(\'#incassiTotali .alert\').removeClass(\'hidden\');\n                        $(\'#incassiTotali .alert span\').text(diff + \'\u20ac\');\n                    }else{\n                        var tot = 30000;\n                        $(\'#incassiTotali .missing span\').text(30000-income-fake);\n                        $(\'#incassiTotali .missing\').removeClass(\'hidden\');\n                        if (!$(\'#incassiTotali .alert\').hasClass(\'hidden\'))\n                            $(\'#incassiTotali .alert\').addClass(\'hidden\');\n                    }\n                    \n                    var perc = {\n                        success: {\n                            prog: Math.round((income/tot)*100*100)/100,\n                            num: income\n                        },\n                        warning: {\n                            prog: Math.round((fake/tot)*100*100)/100,\n                            num: fake\n                        }\n                    }\n\n                    for (var el in perc){\n                        var bar = perc[el].prog + \'%\';\n                        var num = perc[el].num + \'\u20ac\';\n                        $(\'#incassiTotali .progress\').find(\'.progress-bar-\' + el).css(\'width\',bar).text(num);\n                    }\n\n                    console.log(\'perc\', perc);\n                }\n\n                maxExpense();\n                function maxExpense(){\n                    $.ajax({\n                        url: \'/reports/maxExpense\',\n                        dataType: \'json\',\n                        type: \'get\',\n                        beforeSend: function(){\n                            console.log(\'richiedendo spese beni strumetnali\')\n                        },\n                        success: function(res){\n                            console.log(\'res\', res);\n\n                            var realExpense = Math.abs(res[1].total);\n                            var fakeExpense = Math.abs(res[0].total);\n                            var limit = 15000;\n                            var diff = realExpense+fakeExpense-limit;\n                            var tot = (diff>0) ? realExpense+fakeExpense : limit;\n\n                            realPerc = Math.round((realExpense/tot)*100*100)/100;\n                            fakePerc = Math.round((fakeExpense/tot)*100*100)/100;\n\n                            $(\'#maxExpense .progress-bar-success\').css(\'width\', realPerc + \'%\').text(realExpense + \'\u20ac\');\n                            $(\'#maxExpense .progress-bar-warning\').css(\'width\', fakePerc + \'%\').text(fakeExpense + \'\u20ac\');\n\n                            if (diff > 0){\n                                if (!$(\'#maxExpense .missing\').hasClass(\'hidden\'))\n                                    $(\'#maxExpense .missing\').addClass(\'hidden\');\n                                $(\'#maxExpense .alert\').removeClass(\'hidden\');\n                                $(\'#maxExpense .alert span\').text(diff + \'\u20ac\');\n                            }else{\n                                $(\'#maxExpense .missing span\').text(limit-realExpense-fakeExpense);\n                                $(\'#maxExpense .missing\').removeClass(\'hidden\');\n                                if (!$(\'#maxExpense .alert\').hasClass(\'hidden\'))\n                                    $(\'#maxExpense .alert\').addClass(\'hidden\');\n                            }\n\n                            console.log(\'res\', res);\n                        }\n                    })\n                }\n                \n                \n                \n                \n            })\n        </script>');
            });
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);