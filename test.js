const { WXMINIUser, WXMINIQR } = require("./src");
const fs = require("fs");
const path = require("path");

let appId = "";
let secret = "";

let wXMINIUser = new WXMINIUser({
    appId,
    secret,
});

async function test() {
    let access_token = await wXMINIUser.getAccessToken();

    let wXMINIQR = new WXMINIQR();
    let qrResult = await wXMINIQR.getMiniQRLimit({
        access_token,
        path: "pages/index/index?test=123",
        is_hyaline: true,
        env_version: "trial",
    });

    const base64Data = qrResult.toString("base64");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const imagePath = path.join(
        __dirname,
        "output",
        `qrcode_${Date.now()}.png`
    );

    fs.writeFile(imagePath, imageBuffer, (err) => {
        if (err) {
            console.error("保存图片时出错:", err);
        } else {
            console.log("二维码图片已保存至:", imagePath);
        }
    });
}

test();
