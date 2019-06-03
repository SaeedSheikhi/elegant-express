module.exports = function(user, token) {
  return `
  
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
  >
    <head>
      <!--[if gte mso 9
        ]><xml
          ><o:OfficeDocumentSettings
            ><o:AllowPNG /><o:PixelsPerInch
              >96</o:PixelsPerInch
            ></o:OfficeDocumentSettings
          ></xml
        ><!
      [endif]-->
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width" name="viewport" />
      <!--[if !mso]><!-->
      <meta content="IE=edge" http-equiv="X-UA-Compatible" />
      <!--<![endif]-->
      <title></title>
      <!--[if !mso]><!-->
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://cdn.rawgit.com/rastikerdar/shabnam-font/v3.0.1/dist/font-face.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Exo+2:700"
        rel="stylesheet"
      />
      <style>
        @font-face {
          font-family: Shabnam;
          src: url("Shabnam.eot");
          src: url("Shabnam.eot?#iefix") format("embedded-opentype"),
            url("Shabnam.woff") format("woff"),
            url("Shabnam.ttf") format("truetype");
          font-weight: normal;
        }
  
        @font-face {
          font-family: Shabnam;
          src: url("Shabnam-Bold.eot");
          src: url("Shabnam-Bold.eot?#iefix") format("embedded-opentype"),
            url("Shabnam-Bold.woff") format("woff"),
            url("Shabnam-Bold.ttf") format("truetype");
          font-weight: bold;
        }
  
        @font-face {
          font-family: Shabnam;
          src: url("Shabnam-Light.eot");
          src: url("Shabnam-Light.eot?#iefix") format("embedded-opentype"),
            url("Shabnam-Light.woff") format("woff"),
            url("Shabnam-Light.ttf") format("truetype");
          font-weight: 300;
        }
      </style>
      <!--<![endif]-->
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
        }
  
        table,
        td,
        tr {
          vertical-align: top;
          border-collapse: collapse;
        }
  
        * {
          line-height: inherit;
        }
  
        a[x-apple-data-detectors="true"] {
          color: inherit !important;
          text-decoration: none !important;
        }
  
        .ie-browser table {
          table-layout: fixed;
        }
  
        [owa] .img-container div,
        [owa] .img-container button {
          display: block !important;
        }
  
        [owa] .fullwidth button {
          width: 100% !important;
        }
  
        [owa] .block-grid .col {
          display: table-cell;
          float: none !important;
          vertical-align: top;
        }
  
        .ie-browser .block-grid,
        .ie-browser .num12,
        [owa] .num12,
        [owa] .block-grid {
          width: 600px !important;
        }
  
        .ie-browser .mixed-two-up .num4,
        [owa] .mixed-two-up .num4 {
          width: 200px !important;
        }
  
        .ie-browser .mixed-two-up .num8,
        [owa] .mixed-two-up .num8 {
          width: 400px !important;
        }
  
        .ie-browser .block-grid.two-up .col,
        [owa] .block-grid.two-up .col {
          width: 300px !important;
        }
  
        .ie-browser .block-grid.three-up .col,
        [owa] .block-grid.three-up .col {
          width: 300px !important;
        }
  
        .ie-browser .block-grid.four-up .col [owa] .block-grid.four-up .col {
          width: 150px !important;
        }
  
        .ie-browser .block-grid.five-up .col [owa] .block-grid.five-up .col {
          width: 120px !important;
        }
  
        .ie-browser .block-grid.six-up .col,
        [owa] .block-grid.six-up .col {
          width: 100px !important;
        }
  
        .ie-browser .block-grid.seven-up .col,
        [owa] .block-grid.seven-up .col {
          width: 85px !important;
        }
  
        .ie-browser .block-grid.eight-up .col,
        [owa] .block-grid.eight-up .col {
          width: 75px !important;
        }
  
        .ie-browser .block-grid.nine-up .col,
        [owa] .block-grid.nine-up .col {
          width: 66px !important;
        }
  
        .ie-browser .block-grid.ten-up .col,
        [owa] .block-grid.ten-up .col {
          width: 60px !important;
        }
  
        .ie-browser .block-grid.eleven-up .col,
        [owa] .block-grid.eleven-up .col {
          width: 54px !important;
        }
  
        .ie-browser .block-grid.twelve-up .col,
        [owa] .block-grid.twelve-up .col {
          width: 50px !important;
        }
      </style>
      <style id="media-query" type="text/css">
        @media only screen and (min-width: 620px) {
          .block-grid {
            width: 600px !important;
          }
  
          .block-grid .col {
            vertical-align: top;
          }
  
          .block-grid .col.num12 {
            width: 600px !important;
          }
  
          .block-grid.mixed-two-up .col.num3 {
            width: 150px !important;
          }
  
          .block-grid.mixed-two-up .col.num4 {
            width: 200px !important;
          }
  
          .block-grid.mixed-two-up .col.num8 {
            width: 400px !important;
          }
  
          .block-grid.mixed-two-up .col.num9 {
            width: 450px !important;
          }
  
          .block-grid.two-up .col {
            width: 300px !important;
          }
  
          .block-grid.three-up .col {
            width: 200px !important;
          }
  
          .block-grid.four-up .col {
            width: 150px !important;
          }
  
          .block-grid.five-up .col {
            width: 120px !important;
          }
  
          .block-grid.six-up .col {
            width: 100px !important;
          }
  
          .block-grid.seven-up .col {
            width: 85px !important;
          }
  
          .block-grid.eight-up .col {
            width: 75px !important;
          }
  
          .block-grid.nine-up .col {
            width: 66px !important;
          }
  
          .block-grid.ten-up .col {
            width: 60px !important;
          }
  
          .block-grid.eleven-up .col {
            width: 54px !important;
          }
  
          .block-grid.twelve-up .col {
            width: 50px !important;
          }
        }
  
        @media (max-width: 620px) {
          .block-grid,
          .col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
  
          .block-grid {
            width: 100% !important;
          }
  
          .col {
            width: 100% !important;
          }
  
          .col > div {
            margin: 0 auto;
          }
  
          img.fullwidth,
          img.fullwidthOnMobile {
            max-width: 100% !important;
          }
  
          .no-stack .col {
            min-width: 0 !important;
            display: table-cell !important;
          }
  
          .no-stack.two-up .col {
            width: 50% !important;
          }
  
          .no-stack .col.num4 {
            width: 33% !important;
          }
  
          .no-stack .col.num8 {
            width: 66% !important;
          }
  
          .no-stack .col.num4 {
            width: 33% !important;
          }
  
          .no-stack .col.num3 {
            width: 25% !important;
          }
  
          .no-stack .col.num6 {
            width: 50% !important;
          }
  
          .no-stack .col.num9 {
            width: 75% !important;
          }
  
          .mobile_hide {
            min-height: 0px;
            max-height: 0px;
            max-width: 0px;
            display: none;
            overflow: hidden;
            font-size: 0px;
          }
        }
      </style>
    </head>
    <body
      class="clean-body"
      style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #e2eace;"
    >
      <style id="media-query-bodytag" type="text/css">
        @media (max-width: 620px) {
          .block-grid {
            min-width: 320px !important;
            max-width: 100% !important;
            width: 100% !important;
            display: block !important;
          }
          .col {
            min-width: 320px !important;
            max-width: 100% !important;
            width: 100% !important;
            display: block !important;
          }
          .col > div {
            margin: 0 auto;
          }
          img.fullwidth {
            max-width: 100% !important;
            height: auto !important;
          }
          img.fullwidthOnMobile {
            max-width: 100% !important;
            height: auto !important;
          }
          .no-stack .col {
            min-width: 0 !important;
            display: table-cell !important;
          }
          .no-stack.two-up .col {
            width: 50% !important;
          }
          .no-stack.mixed-two-up .col.num4 {
            width: 33% !important;
          }
          .no-stack.mixed-two-up .col.num8 {
            width: 66% !important;
          }
          .no-stack.three-up .col.num4 {
            width: 33% !important;
          }
          .no-stack.four-up .col.num3 {
            width: 25% !important;
          }
        }
      </style>
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <table
        bgcolor="#e2eace"
        cellpadding="0"
        cellspacing="0"
        class="nl-container"
        style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e2eace; width: 100%;"
        valign="top"
        width="100%"
      >
        <tbody>
          <tr style="vertical-align: top;" valign="top">
            <td
              style="word-break: break-word; vertical-align: top; border-collapse: collapse;"
              valign="top"
            >
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#e2eace"><![endif]-->
              <div style="background-color:transparent;">
                <div
                  class="block-grid"
                  style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;"
                >
                  <div
                    style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
                    <div
                      class="col num12"
                      style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;"
                    >
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"
                        >
                          <!--<![endif]-->
                          <div
                            align="center"
                            class="img-container center autowidth fullwidth"
                            style="padding-right: 0px;padding-left: 0px;"
                          >
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
                            <div style="font-size:1px;line-height:25px"></div>
                            <img
                              align="center"
                              alt="Image"
                              border="0"
                              class="center autowidth fullwidth"
                              src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png"
                              style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 600px; display: block;"
                              title="Image"
                              width="600"
                            />
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color:transparent;">
                <div
                  class="block-grid"
                  style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;;"
                >
                  <div
                    style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;"
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#FFFFFF;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div
                      class="col num12"
                      style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;"
                    >
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"
                        >
                          <!--<![endif]-->
                          <div
                            align="center"
                            class="img-container center autowidth fullwidth"
                            style="padding-right: 0px;padding-left: 0px;"
                          >
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><!
                            [endif]--><a
                              href="https://anardoni.com"
                              target="_blank"
                            >
                              <img
                                align="center"
                                alt="Anardoni"
                                border="0"
                                class="center autowidth fullwidth"
                                src="https://cdn.anardoni.com/banner_anardoni.jpeg"
                                style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; height: auto; float: none; border: none; width: 100%; max-width: 600px; display: block;"
                                title="Anardoni"
                                width="600"
                            /></a>
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div
                            style="color:#555555;font-family:'Shabnam','Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"
                          >
                            <div
                              style="font-size: 12px; line-height: 18px; color: #555555; font-family: 'Shabnam','Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"
                            >
                              <p
                                style="font-size: 14px; line-height: 21px; text-align: center; margin: 0;"
                              ></p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color:transparent;">
                <div
                  class="block-grid"
                  style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;;"
                >
                  <div
                    style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;"
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#FFFFFF;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px;"><![endif]-->
                    <div
                      class="col num12"
                      style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;"
                    >
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"
                        >
                          <!--<![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div
                            style="color:#0D0D0D;font-family:'Shabnam','Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"
                          >
                            <div
                              style="line-height: 14px; font-size: 12px; color: #0D0D0D; font-family: 'Shabnam','Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"
                            >
                              <p
                                dir="rtl"
                                style="line-height: 33px; font-size: 12px; text-align: center; margin: 0;"
                              >
                                <span style="font-size: 28px;"
                                  ><strong>سلام ${
  user.profile.name.first
} عزیز،</strong></span
                                ><br /><span
                                  style="font-size: 28px; line-height: 33px;"
                                  >پیرو درخواست بازیابی رمز شما</span
                                >
                              </p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="divider"
                            style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td
                                  class="divider_inner"
                                  style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; border-collapse: collapse;"
                                  valign="top"
                                >
                                  <table
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="divider_content"
                                    style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid #BBBBBB;"
                                    valign="top"
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr
                                        style="vertical-align: top;"
                                        valign="top"
                                      >
                                        <td
                                          style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;"
                                          valign="top"
                                        >
                                          <span></span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div
                            style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;"
                          >
                            <div
                              style="font-size: 12px; line-height: 18px; color: #0D0D0D; font-family: 'Shabnam','Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"
                            >
                              <p
                                dir="rtl"
                                style="font-size: 14px; line-height: 21px; text-align: center; margin: 0;"
                              >
                            برای ادامه کد زیر را در فیلد مربوطه وارد کنید سپس رمز جدید خود را تایید و ثبت کنید
                              </p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <div
                            align="center"
                            class="button-container"
                            style="padding-top:5px;padding-right:5px;padding-bottom:10px;padding-left:10px;"
                          >
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 5px; padding-right: 5px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:43.5pt; width:141pt; v-text-anchor:middle;" arcsize="28%" stroke="false" fillcolor="#A8BF6F"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Trebuchet MS', Tahoma, sans-serif; font-size:24px"><![endif]-->
                            <div
                              style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#A8BF6F;border-radius:16px;-webkit-border-radius:16px;-moz-border-radius:16px;width:auto; width:auto;;border-top:1px solid #A8BF6F;border-right:1px solid #A8BF6F;border-bottom:1px solid #A8BF6F;border-left:1px solid #A8BF6F;padding-top:5px;padding-bottom:5px;font-family:'Shabnam','Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"
                            >
                              <span
                                style="padding-left:30px;padding-right:30px;font-size:24px;display:inline-block;"
                              >
                                <span style="font-size: 16px; line-height: 32px;"
                                  ><span
                                    style="font-size: 24px; line-height: 48px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"
                                    >${token.code}</span
                                  ></span
                                >
                              </span>
                            </div>
                            <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                          </div>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="divider"
                            style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td
                                  class="divider_inner"
                                  style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 30px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; border-collapse: collapse;"
                                  valign="top"
                                >
                                  <table
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="divider_content"
                                    style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 0px solid transparent;"
                                    valign="top"
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr
                                        style="vertical-align: top;"
                                        valign="top"
                                      >
                                        <td
                                          style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;"
                                          valign="top"
                                        >
                                          <span></span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color:transparent;">
                <div
                  class="block-grid three-up"
                  style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #525252;;"
                >
                  <div
                    style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;"
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#525252"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="200" style="background-color:#525252;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                    <div
                      class="col num4"
                      style="max-width: 320px; min-width: 200px; display: table-cell; vertical-align: top;;"
                    >
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"
                        >
                          <!--<![endif]-->
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            class="social_icons"
                            style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td
                                  style="word-break: break-word; vertical-align: top; padding-top: 15px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-collapse: collapse;"
                                  valign="top"
                                >
                                  <table
                                    activate="activate"
                                    align="center"
                                    alignment="alignment"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="social_table"
                                    style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: undefined; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;"
                                    to="to"
                                    valign="top"
                                  >
                                    <tbody>
                                      <tr
                                        align="center"
                                        style="vertical-align: top; display: inline-block; text-align: center;"
                                        valign="top"
                                      >
                                        <td
                                          style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px; border-collapse: collapse;"
                                          valign="top"
                                        >
                                          <a
                                            href="https://instagram.com/anardonicom"
                                            target="_blank"
                                            title="Instagram"
                                            ><img
                                              alt="Instagram"
                                              height="32"
                                              src="https://cdn.anardoni.com/emails/verification_request/images/instagram@2x.png"
                                              style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; height: auto; float: none; border: none; display: block;"
                                              title="Instagram"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td
                                          style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px; border-collapse: collapse;"
                                          valign="top"
                                        >
                                          <a
                                            href="https://anardoni.com"
                                            target="_blank"
                                            title="Web Site"
                                            ><img
                                              alt="Web Site"
                                              height="32"
                                              src="https://cdn.anardoni.com/emails/verification_request/images/website@2x.png"
                                              style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; height: auto; float: none; border: none; display: block;"
                                              title="Web Site"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td
                                          style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px; border-collapse: collapse;"
                                          valign="top"
                                        >
                                          <a
                                            href="https://twitter.com/anardonicom"
                                            target="_blank"
                                            title="Twitter"
                                            ><img
                                              alt="Twitter"
                                              height="32"
                                              src="https://cdn.anardoni.com/emails/verification_request/images/twitter@2x.png"
                                              style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; height: auto; float: none; border: none; display: block;"
                                              title="Twitter"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td
                                          style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px; border-collapse: collapse;"
                                          valign="top"
                                        >
                                          <a
                                            href="https://telegram.org/anardonicom"
                                            target="_blank"
                                            title="Telegram"
                                            ><img
                                              alt="Telegram"
                                              height="32"
                                              src="https://cdn.anardoni.com/emails/verification_request/images/telegram@2x.png"
                                              style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; height: auto; float: none; border: none; display: block;"
                                              title="Telegram"
                                              width="32"
                                          /></a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td><td align="center" width="200" style="background-color:#525252;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div
                      class="col num4"
                      style="max-width: 320px; min-width: 200px; display: table-cell; vertical-align: top;;"
                    >
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"
                        >
                          <!--<![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div
                            style="color:#a8bf6f;font-family:'Shabnam','Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px;"
                          >
                            <div
                              style="font-size: 12px; line-height: 14px; color: #a8bf6f; font-family: 'Shabnam','Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"
                            >
                              <p
                                style="font-size: 12px; line-height: 14px; text-align: center; margin: 0;"
                              >
                                <span
                                  style="color: #ffffff; font-size: 12px; line-height: 14px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"
                                  ><span
                                    style="font-size: 12px; line-height: 14px; color: #a8bf6f;"
  
                                    >Tel.:</span
                                  >
                                  0513 - 104 1111</span
                                >
                              </p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td><td align="center" width="200" style="background-color:#525252;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div
                      class="col num4"
                      style="max-width: 320px; min-width: 200px; display: table-cell; vertical-align: top;;"
                    >
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"
                        >
                          <!--<![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
                          <div
                            style="color:#a8bf6f;font-family:'Shabnam','Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px;"
                          >
                            <div
                              style="font-size: 12px; line-height: 14px; color: #a8bf6f; font-family: 'Shabnam','Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"
                            >
                              <p
                                style="font-size: 12px; line-height: 14px; text-align: center; margin: 0;"
                              >
                                Email
                                <span
                                  style="color: #ffffff; font-size: 12px; line-height: 14px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;"
                                  >info@anardoni.com</span
                                >
                              </p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color:transparent;">
                <div
                  class="block-grid"
                  style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;"
                >
                  <div
                    style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px;"><![endif]-->
                    <div
                      class="col num12"
                      style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;"
                    >
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"
                        >
                          <!--<![endif]-->
                          <div
                            align="center"
                            class="img-container center autowidth fullwidth"
                            style="padding-right: 0px;padding-left: 0px;"
                          >
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><!
                            [endif]--><img
                              align="center"
                              alt="Image"
                              border="0"
                              class="center autowidth fullwidth"
                              src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png"
                              style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 600px; display: block;"
                              title="Image"
                              width="600"
                            />
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="divider"
                            style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr style="vertical-align: top;" valign="top">
                                <td
                                  class="divider_inner"
                                  style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 30px; padding-right: 30px; padding-bottom: 30px; padding-left: 30px; border-collapse: collapse;"
                                  valign="top"
                                >
                                  <table
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="divider_content"
                                    style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 0px solid transparent;"
                                    valign="top"
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr
                                        style="vertical-align: top;"
                                        valign="top"
                                      >
                                        <td
                                          style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;"
                                          valign="top"
                                        >
                                          <span></span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if (IE)]></div><![endif]-->
    </body>
  </html>
    `;
};
