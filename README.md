# ئەپی نەخۆشخانە — سێ ئەپی جیاواز

| فۆڵدەر | ڕووکار | دەرچوو |
|---|---|---|
| `app-windows` | لاپتۆپ (sidebar) | `.exe` |
| `app-android` | ئەندرۆید (Material You) | `.apk` |
| `app-iphone` | ئایفۆن (iOS) | ئەپی Home Screen یان `.ipa` |

هەر ئەپێک ڕووکاری تایبەتی خۆی هەیە و دوگمەی گۆڕینی ڕووکار تێیدا نییە.

## ڕێگای خێرا (بێ پارە)
فۆڵدەری `www` ی ناو هەر ئەپێک بەرز بکەرەوە بۆ https://app.netlify.com/drop
- ئایفۆن: Safari ← Share ← Add to Home Screen (لە `app-iphone/www`)
- ئەندرۆید: Chrome ← Install app (لە `app-android/www`)
- ویندۆز: Chrome/Edge ← Install (لە `app-windows/www`)

## دروستکردنی .exe و .apk
1. هەموو ئەم فایلانە (لەگەڵ `.github`) بەرز بکەرەوە بۆ ڕیپۆیەکی GitHub.
2. Actions ← Build apps ← Run workflow.
3. لە Artifacts دەتوانیت `windows-exe` و `android-apk` دابەزێنیت.
4. بۆ APK لە مۆبایل ڕێگە بدە بە Install unknown apps.

## ئایفۆن (.ipa)
پێویستی بە Mac و Xcode و Apple Developer هەیە:
```
cd app-iphone
npm install
npx cap add ios
npx cap sync ios
npx cap open ios
```
