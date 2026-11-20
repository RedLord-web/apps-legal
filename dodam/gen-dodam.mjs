// 도담 법적 문서 생성기: 5개 언어(en/ko/ja/zh/vi), 개인정보처리방침, 이용약관, 랜딩
// 언어 간 구조를 한 소스에서 통일한다. 실행: node gen-dodam.mjs
//
// 앱 실제 동작 기준(2026-11):
//   - 가입, 로그인, 자체 서버, 광고, 분석, 크래시 리포트 없음.
//   - 기록과 사진은 기기 밖으로 나가지 않는다. 실행 중 인터넷은 스토어 결제 처리에만 쓰인다.
//   - 유일한 외부 처리 = 도담 플러스 한 번 결제(Apple App Store / Google Play). 영수증 서버 없음.
//   - 초대 코드는 기기 안에서 확인한다.
import { writeFileSync } from 'node:fs';

const EFFECTIVE = { en: 'November 20, 2026', ko: '2026년 11월 20일', ja: '2026年11月20日', zh: '2026年11月20日', vi: 'Ngày 20 tháng 11, 2026' };
const OPERATOR = '매듭연구소'; // 기존 저장소 표기 유지
const EMAIL = 'knotlabdev@gmail.com';
const APP_NAME = { en: 'Dodam (도담)', ko: '도담 (Dodam)', ja: 'ドダム (Dodam)', zh: 'Dodam (도담)', vi: 'Dodam (도담)' };
const APPLE_PRIVACY = '<a href="https://www.apple.com/legal/privacy/">apple.com/legal/privacy</a>';
const GOOGLE_PRIVACY = '<a href="https://policies.google.com/privacy">policies.google.com/privacy</a>';

// 파일명: en은 기본(privacy.html), 그 외 언어는 접미사(privacy.ko.html)
const LANGS = ['en', 'ko', 'ja', 'zh', 'vi'];
const LANG_LABEL = { en: 'English', ko: '한국어', ja: '日本語', zh: '中文', vi: 'Tiếng Việt' };
const suffix = (lang) => (lang === 'en' ? '' : '.' + lang);
const file = (base, lang) => `${base}${suffix(lang)}.html`;

const T = {
  privacyTitle: { en: 'Privacy Policy', ko: '개인정보처리방침', ja: 'プライバシーポリシー', zh: '隐私政策', vi: 'Chính sách quyền riêng tư' },
  termsTitle: { en: 'Terms of Service', ko: '이용약관', ja: '利用規約', zh: '服务条款', vi: 'Điều khoản dịch vụ' },
  effectiveWord: { en: 'Effective', ko: '시행일', ja: '施行日', zh: '生效日', vi: 'Ngày hiệu lực' },
  appWord: { en: 'App', ko: '앱', ja: 'アプリ', zh: '应用', vi: 'Ứng dụng' },
  tagline: {
    en: 'Baby growth records and vaccination schedule for foreign parents in Korea',
    ko: '외국인 부모를 위한 아기 성장 기록과 예방접종 일정 (대한민국)',
    ja: '韓国で子育てする外国人の親のための、成長記録と予防接種スケジュール',
    zh: '为在韩国育儿的外国父母打造的宝宝成长记录与预防接种日程',
    vi: 'Ghi lại sự lớn khôn của bé và lịch tiêm chủng cho cha mẹ người nước ngoài tại Hàn Quốc',
  },
  backToList: { en: '← Back to app list', ko: '← 앱 목록으로', ja: '← アプリ一覧へ', zh: '← 返回应用列表', vi: '← Về danh sách ứng dụng' },
  langLabel: { en: 'Language', ko: '언어', ja: '言語', zh: '语言', vi: 'Ngôn ngữ' },
  seePrivacy: { en: 'Privacy Policy', ko: '개인정보처리방침', ja: 'プライバシーポリシー', zh: '隐私政策', vi: 'Chính sách quyền riêng tư' },
  seeTerms: { en: 'Terms of Service', ko: '이용약관', ja: '利用規約', zh: '服务条款', vi: 'Điều khoản dịch vụ' },
};

// ─────────────────────────── 개인정보처리방침 본문
const PRIVACY = {
  en: {
    intro: 'Dodam (도담, the "App") handles information for the following purposes.',
    purpose: [
      'Recording your child\'s growth and showing it on growth charts',
      'Showing the vaccination, checkup and paperwork schedule for children in Korea, and reminding you of it',
      'Showing your own photos by your baby\'s age in months, and making age-stamped photos, postcards, photobooks and growth movies',
      'Helping you fill in the vaccination screening form and describe symptoms at the hospital (hospital card)',
      'Processing the one-time in-app purchase (Dodam Plus)',
    ],
    collectIntro: 'The App works without sign-up or login. We do not operate any server, and the App has no ads, analytics or crash reporting. While running, the App does not use the internet except for the app store\'s own purchase processing. Everything you enter is stored only on your device and is never sent to us.',
    items: [
      ['👶', 'Child information', 'Your child\'s name, date of birth, sex (optional) and nationality (optional, used only to show the paperwork that applies).'],
      ['📏', 'Growth and schedule records', 'Height, weight and head circumference measurements, marks for completed schedule items, and "Firsts" milestones.'],
      ['📝', 'Screening-form helper answers', 'Answers you keep in the vaccination screening-form helper. The helper never stores names or ID numbers; you write those on the paper form yourself.'],
      ['🖼️', 'Photo references and settings', 'IDs of photos you hid or picked for Firsts and the photobook (with their capture time and file name, so they can be found again), and your app settings. The photos themselves are not copied into the App.'],
    ],
    permIntro: 'The App asks for the following permissions only when you use the related feature. You can change them at any time in your device settings.',
    perms: [
      '<strong>Photos (read)</strong>: to show your own photos grouped by your baby\'s age in months. Photos are read on the device and are never transmitted. On iOS, the App also works with limited access (only the photos you select).',
      '<strong>Photos (add)</strong>: to save the age-stamped photos, postcards, photobook pages and growth movies you make to your photo library.',
      '<strong>Notifications</strong>: for reminders about vaccinations, checkup periods, paperwork deadlines and anniversaries. Reminders are scheduled on the device, and there is no push server. You can turn them off in the App\'s settings or in your device settings.',
      '<strong>Files</strong>: "Export records" creates a backup file and saves it wherever you choose. "Restore from file" reads that file back. The file contains your child\'s information, growth records, done marks, Firsts, screening-form answers and settings (photo IDs only, not the photos themselves).',
    ],
    iapHead: 'In-App Purchase (Dodam Plus)',
    iap: [
      'Dodam Plus is a one-time (non-consumable) purchase processed by the Apple App Store or Google Play.',
      'The App does not receive your payment card information. Whether you own Plus is checked on the device with the store, and we do not operate any receipt server.',
      'An invite code (for teachers) can also unlock Plus. The code is checked on the device and is not sent anywhere.',
      `Apple Privacy Policy: ${APPLE_PRIVACY}<br />Google Privacy Policy: ${GOOGLE_PRIVACY}`,
    ],
    third: ['We do not collect your information, so we do not provide it to third parties.', 'The only outside processing is the following:'],
    thirdList: [
      'Purchases: payment for Dodam Plus is handled by Apple or Google under their own privacy policies (see Article 4)',
      'Hospital card voice: Korean audio pre-generated and bundled in the App, with the device\'s built-in speech engine as a fallback; the App itself sends nothing externally (how the device speech engine works follows the device maker and OS policies)',
    ],
    intl: ['The App is released only in Korea. Purchase processing by the following companies may take place outside Korea:', 'Apple Inc. (United States): payment processing for Dodam Plus on iOS', 'Google LLC (United States): payment processing for Dodam Plus on Android'],
    retain: [
      'Everything the App stores stays on your device. It is deleted when you use Settings → "Start over" or delete the App.',
      'Backup files you exported stay where you saved them and remain under your control. Please delete them yourself when you no longer need them.',
      'Purchase records are kept by Apple or Google under their own policies.',
    ],
    rights: ['You can view, change or delete your information at any time.'],
    rightsList: [
      'Edit records: directly on each screen of the App',
      'Delete all on-device data: Settings → "Start over", or delete the App',
      'Exported files: delete them from where you saved them',
      'Photo and notification access: change it in your device settings',
    ],
    rightsTail: 'When you move to a new device, use "Restore from file" to bring your records and "Restore purchase" on the Dodam Plus screen to bring your purchase.',
    children: [
      'The App is meant to be used by parents and guardians. Information about the child is entered by the parent or guardian and stays on the device.',
      'We do not collect information from children.',
    ],
    contact: 'For privacy inquiries, please contact us below.',
    contactList: [`Operator: ${OPERATOR}`, `Email: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ Your Records Stay on Your Device',
    info: 'No sign-up, no server, no ads and no analytics. The App does not send your records or photos anywhere. The only outside processing is the store payment for Dodam Plus.',
    footerTerms: 'Terms of Service',
  },
  ko: {
    intro: '도담(이하 "앱")은 다음의 목적으로 정보를 처리합니다.',
    purpose: [
      '아이의 성장 기록과 성장 곡선 표시',
      '한국의 예방접종, 영유아 건강검진, 행정 수속 일정 표시와 알림',
      '휴대폰 사진을 아이의 월령별로 보여 주고, 월령 스탬프 사진, 엽서, 포토북, 성장 영상을 만드는 기능',
      '예방접종 예진표 작성 도움과, 병원에서 증상을 전하는 병원 카드',
      '한 번 결제하는 인앱 구매(도담 플러스) 처리',
    ],
    collectIntro: '앱은 회원가입이나 로그인 없이 동작합니다. 운영자는 서버를 두지 않으며, 앱에는 광고, 이용 분석, 크래시 리포트가 없습니다. 앱은 실행 중에 앱스토어의 결제 처리 외에는 인터넷을 쓰지 않습니다. 입력한 내용은 모두 이용자의 기기에만 저장되며 운영자에게 전송되지 않습니다.',
    items: [
      ['👶', '아이 정보', '아이의 이름, 생년월일, 성별(선택), 국적(선택, 해당하는 수속만 보여 주는 데에만 씁니다).'],
      ['📏', '성장과 일정 기록', '키, 몸무게, 머리둘레 기록, 완료로 표시한 일정, 첫 기록.'],
      ['📝', '예진표 도우미의 답', '예진표 도우미에서 기억해 두는 답. 이름과 주민등록번호 같은 번호는 저장하지 않으며, 종이 예진표에 직접 적습니다.'],
      ['🖼️', '사진 참조와 설정', '숨긴 사진, 첫 기록과 포토북에서 고른 사진의 ID(다시 찾기 위한 찍은 시각과 파일 이름 포함)와 앱 설정. 사진 자체는 앱 안으로 복사하지 않습니다.'],
    ],
    permIntro: '앱은 관련 기능을 쓸 때에만 아래 권한을 요청합니다. 권한은 언제든지 기기 설정에서 바꿀 수 있습니다.',
    perms: [
      '<strong>사진(읽기)</strong>: 휴대폰의 사진을 아이의 월령별로 묶어 보여 주기 위해 씁니다. 사진은 기기 안에서 읽기만 하며 외부로 전송하지 않습니다. iOS에서는 선택한 사진만 허용하는 제한된 접근으로도 쓸 수 있습니다.',
      '<strong>사진(추가)</strong>: 만든 월령 스탬프 사진, 엽서, 포토북 페이지, 성장 영상을 사진 앱에 저장하기 위해 씁니다.',
      '<strong>알림</strong>: 예방접종, 건강검진 시기, 수속 기한, 기념일을 알려 드리기 위해 씁니다. 알림은 기기 안에서 예약되며 푸시 서버는 쓰지 않습니다. 앱 설정이나 기기 설정에서 끌 수 있습니다.',
      '<strong>파일</strong>: "기록 내보내기"로 백업 파일을 만들어 이용자가 고른 곳에 저장합니다. "파일로 복원"은 그 파일을 다시 읽어 옵니다. 파일에는 아이 정보, 성장 기록, 완료 표시, 첫 기록, 예진표 답, 설정이 들어 있습니다(사진은 ID만 들어 있고 사진 자체는 들어 있지 않습니다).',
    ],
    iapHead: '인앱 구매(도담 플러스)',
    iap: [
      '도담 플러스는 Apple App Store 또는 Google Play에서 처리하는 한 번 결제(비소모성) 상품입니다.',
      '앱은 결제 카드 정보를 받지 않습니다. 플러스 구매 여부는 기기에서 스토어를 통해 확인하며, 운영자는 영수증 서버를 두지 않습니다.',
      '선생님을 위한 초대 코드로도 플러스를 열 수 있습니다. 코드는 기기 안에서 확인하며 어디로도 전송하지 않습니다.',
      `Apple 개인정보처리방침: ${APPLE_PRIVACY}<br />Google 개인정보처리방침: ${GOOGLE_PRIVACY}`,
    ],
    third: ['운영자는 개인정보를 수집하지 않으므로 제3자에게 제공하지 않습니다.', '외부에서 처리되는 것은 다음뿐입니다.'],
    thirdList: [
      '구매: 도담 플러스 결제는 Apple 또는 Google이 각 사의 개인정보처리방침에 따라 처리합니다(제4조 참고)',
      '병원 카드 음성: 앱에 들어 있는 미리 만든 한국어 음성을 쓰고, 없을 때는 기기에 내장된 음성 엔진을 씁니다. 앱은 이를 위해 정보를 외부로 보내지 않습니다 (기기 음성 엔진의 처리는 기기 제조사와 OS의 정책을 따릅니다)',
    ],
    intl: ['앱은 한국에서만 출시됩니다. 다만 아래 회사의 결제 처리는 한국 밖에서 이루어질 수 있습니다.', 'Apple Inc.(미국): iOS에서의 도담 플러스 결제 처리', 'Google LLC(미국): Android에서의 도담 플러스 결제 처리'],
    retain: [
      '앱이 저장하는 모든 정보는 이용자의 기기에만 있습니다. 설정의 "처음부터 다시 하기"를 쓰거나 앱을 삭제하면 지워집니다.',
      '내보낸 백업 파일은 이용자가 저장한 곳에 남으며 이용자가 관리합니다. 필요 없어지면 직접 지워 주세요.',
      '구매 기록은 Apple 또는 Google이 각 사의 정책에 따라 보관합니다.',
    ],
    rights: ['이용자는 언제든지 정보를 확인, 수정, 삭제할 수 있습니다.'],
    rightsList: [
      '기록 수정: 앱의 각 화면에서 직접',
      '기기 내 전체 데이터 삭제: 설정 → "처음부터 다시 하기", 또는 앱 삭제',
      '내보낸 파일: 저장한 곳에서 직접 삭제',
      '사진과 알림 접근: 기기 설정에서 변경',
    ],
    rightsTail: '새 기기로 옮길 때는 "파일로 복원"으로 기록을, 도담 플러스 화면의 "구매 복원"으로 구매를 옮길 수 있습니다.',
    children: [
      '앱은 부모와 보호자가 쓰는 앱입니다. 아이에 관한 정보는 부모나 보호자가 입력하며 기기 안에만 남습니다.',
      '운영자는 아동으로부터 정보를 수집하지 않습니다.',
    ],
    contact: '개인정보 관련 문의 사항이 있으시면 아래로 연락해 주세요.',
    contactList: [`운영자: ${OPERATOR}`, `이메일: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ 기록은 기기 안에만',
    info: '회원가입, 서버, 광고, 이용 분석이 없습니다. 앱은 기록과 사진을 어디로도 보내지 않습니다. 외부에서 처리되는 것은 도담 플러스의 스토어 결제뿐입니다.',
    footerTerms: '이용약관',
  },
  ja: {
    intro: 'ドダム（以下「本アプリ」）は、次の目的で情報を取り扱います。',
    purpose: [
      'お子さまの成長の記録と、成長曲線での表示',
      '韓国での予防接種、乳幼児健診、行政手続きのスケジュールの表示とお知らせ',
      'お手持ちの写真を月齢ごとに表示し、月齢スタンプ写真、はがき、フォトブック、成長ムービーを作る機能',
      '予防接種の予診票の記入のお手伝いと、病院で症状を伝えるための病院カード',
      '買い切りのアプリ内課金（ドダム プラス）の処理',
    ],
    collectIntro: '本アプリは会員登録もログインも必要ありません。運営者はサーバーを持たず、本アプリには広告、利用状況の分析、クラッシュレポートもありません。動作中にインターネットを使うのは、アプリストアによる購入処理のときだけです。入力した内容はすべて端末の中にだけ保存され、運営者に送られることはありません。',
    items: [
      ['👶', 'お子さまの情報', 'お名前、生年月日、性別（任意）、国籍（任意。該当する手続きを表示するためだけに使います）。'],
      ['📏', '成長と予定の記録', '身長、体重、頭囲の記録、「済み」にした予定、「はじめて」の記録。'],
      ['📝', '予診票の記入補助の答え', '予診票の記入補助で覚えておく答え。お名前や住民登録番号などの番号は保存しません（紙の予診票にご自身で書いてください）。'],
      ['🖼️', '写真の参照と設定', '非表示にした写真や、「はじめて」とフォトブックで選んだ写真のID（あとで見つけ直すための撮影日時とファイル名を含みます）と、アプリの設定。写真そのものは本アプリにコピーしません。'],
    ],
    permIntro: '本アプリは、関連する機能を使うときにだけ次の権限をお願いします。権限は端末の設定でいつでも変更できます。',
    perms: [
      '<strong>写真（読み取り）</strong>: お手持ちの写真をお子さまの月齢ごとにまとめて表示するために使います。写真は端末の中で読み取るだけで、外部へ送信しません。iOSでは、選んだ写真だけを許可する制限付きのアクセスでも使えます。',
      '<strong>写真（追加）</strong>: 作った月齢スタンプ写真、はがき、フォトブックのページ、成長ムービーを写真アプリに保存するために使います。',
      '<strong>通知</strong>: 予防接種、健診の時期、手続きの期限、記念日をお知らせするために使います。通知は端末の中で予約され、プッシュサーバーは使いません。本アプリの設定または端末の設定でオフにできます。',
      '<strong>ファイル</strong>: 「記録を書き出す」でバックアップファイルを作り、お好きな場所に保存します。「ファイルから戻す」でそのファイルを読み込みます。ファイルには、お子さまの情報、成長の記録、「済み」の印、「はじめて」、予診票の答え、設定が入ります（写真はIDだけで、写真そのものは入りません）。',
    ],
    iapHead: 'アプリ内課金（ドダム プラス）',
    iap: [
      'ドダム プラスは、Apple App StoreまたはGoogle Playで処理される買い切り（非消耗型）の商品です。',
      '本アプリはクレジットカードなどの支払い情報を受け取りません。プラスを購入済みかどうかは端末からストアに確認し、運営者はレシートを確認するサーバーを持ちません。',
      '先生向けの招待コードでもプラスを使えるようになります。コードは端末の中で確認し、どこにも送信しません。',
      `Appleのプライバシーポリシー: ${APPLE_PRIVACY}<br />Googleのプライバシーポリシー: ${GOOGLE_PRIVACY}`,
    ],
    third: ['運営者は個人情報を収集しないため、第三者に提供することもありません。', '外部で処理されるのは次のものだけです。'],
    thirdList: [
      '購入: ドダム プラスの決済は、AppleまたはGoogleが各社のプライバシーポリシーに従って処理します（第4条参照）',
      '病院カードの音声: 本アプリに入っている、あらかじめ作った韓国語の音声を使い、ない場合は端末内蔵の音声エンジンを使います。本アプリがこのために情報を外部へ送ることはありません（端末の音声エンジンの処理は、端末メーカーとOSのポリシーに従います）',
    ],
    intl: ['本アプリは韓国でのみ配信しています。ただし、次の会社による決済処理は韓国の外で行われる場合があります。', 'Apple Inc.（米国）: iOSでのドダム プラスの決済処理', 'Google LLC（米国）: Androidでのドダム プラスの決済処理'],
    retain: [
      '本アプリが保存する情報は、すべて端末の中にだけあります。設定の「最初からやり直す」を使うか、本アプリを削除すると消去されます。',
      '書き出したバックアップファイルは、保存した場所に残り、利用者ご自身が管理します。不要になったらご自身で削除してください。',
      '購入の記録は、AppleまたはGoogleが各社のポリシーに従って保管します。',
    ],
    rights: ['利用者はいつでも情報を確認、修正、削除できます。'],
    rightsList: [
      '記録の修正: 本アプリの各画面で直接',
      '端末内の全データの削除: 設定 → 「最初からやり直す」、または本アプリの削除',
      '書き出したファイル: 保存した場所でご自身で削除',
      '写真と通知のアクセス: 端末の設定で変更',
    ],
    rightsTail: '新しい端末に移るときは、「ファイルから戻す」で記録を、ドダム プラスの画面の「購入を復元」で購入を引き継げます。',
    children: [
      '本アプリは、親や保護者が使うアプリです。お子さまに関する情報は親や保護者が入力し、端末の中にだけ残ります。',
      '運営者は、子どもから情報を収集しません。',
    ],
    contact: '個人情報に関するお問い合わせは、以下までご連絡ください。',
    contactList: [`運営者: ${OPERATOR}`, `メール: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ 記録は端末の中だけに',
    info: '会員登録、サーバー、広告、利用状況の分析はありません。本アプリは記録や写真をどこにも送りません。外部で処理されるのは、ドダム プラスのストア決済だけです。',
    footerTerms: '利用規約',
  },
  zh: {
    intro: 'Dodam（도담，以下称"本应用"）为以下目的处理信息。',
    purpose: [
      '记录孩子的成长，并以成长曲线显示',
      '显示韩国的预防接种、婴幼儿健康检查及行政手续日程，并进行提醒',
      '按宝宝的月龄显示您手机里的照片，并制作月龄贴照片、明信片、照片书和成长视频',
      '协助填写预防接种预诊表，以及在医院说明症状的看病卡片',
      '处理一次性买断的应用内购买（Dodam Plus）',
    ],
    collectIntro: '本应用无需注册或登录即可使用。运营者不设任何服务器，本应用没有广告、使用分析和崩溃报告。运行时，除应用商店自身的购买处理外，本应用不使用网络。您输入的所有内容仅保存在您的设备上，不会发送给运营者。',
    items: [
      ['👶', '孩子的信息', '孩子的姓名、出生日期、性别（可选）和国籍（可选，仅用于显示适用的手续）。'],
      ['📏', '成长与日程记录', '身高、体重、头围记录，标记为已完成的日程，以及"第一次"记录。'],
      ['📝', '预诊表助手的答案', '在预诊表助手中保留的答案。助手不保存姓名或证件号码，这些请您亲自填写在纸质预诊表上。'],
      ['🖼️', '照片引用与设置', '已隐藏的照片，以及在"第一次"和照片书中选择的照片的 ID（包含用于重新找到照片的拍摄时间和文件名），以及应用设置。照片本身不会复制到本应用中。'],
    ],
    permIntro: '本应用仅在您使用相关功能时请求以下权限。您可以随时在设备设置中更改。',
    perms: [
      '<strong>照片（读取）</strong>：用于按宝宝的月龄分组显示您自己的照片。照片仅在设备上读取，绝不会传输。在 iOS 上，仅允许访问所选照片的受限访问也可以使用。',
      '<strong>照片（添加）</strong>：用于将您制作的月龄贴照片、明信片、照片书页面和成长视频保存到相册。',
      '<strong>通知</strong>：用于提醒预防接种、健康检查时间、手续期限和纪念日。提醒在设备上预约，不使用推送服务器。可在本应用的设置或设备设置中关闭。',
      '<strong>文件</strong>："导出记录"会生成备份文件，并保存到您选择的位置。"从文件恢复"会重新读取该文件。文件包含孩子的信息、成长记录、完成标记、"第一次"、预诊表答案和设置（照片仅含 ID，不含照片本身）。',
    ],
    iapHead: '应用内购买（Dodam Plus）',
    iap: [
      'Dodam Plus 是由 Apple App Store 或 Google Play 处理的一次性（非消耗型）购买项目。',
      '本应用不会接收您的支付卡信息。是否已购买 Plus 由设备向商店确认，运营者不设收据验证服务器。',
      '面向老师的邀请码也可以开启 Plus。邀请码在设备上验证，不会发送到任何地方。',
      `Apple 隐私政策：${APPLE_PRIVACY}<br />Google 隐私政策：${GOOGLE_PRIVACY}`,
    ],
    third: ['运营者不收集您的个人信息，因此也不会向第三方提供。', '在外部进行的处理仅有以下几项：'],
    thirdList: [
      '购买：Dodam Plus 的付款由 Apple 或 Google 按照各自的隐私政策处理（见第4条）',
      '看病卡片的语音：使用应用内置的预先生成的韩语音频，无音频时使用设备内置的语音引擎，本应用不会为此向外部发送信息（设备语音引擎的处理遵循设备厂商和操作系统的政策）',
    ],
    intl: ['本应用仅在韩国上架。但以下公司的付款处理可能在韩国境外进行：', 'Apple Inc.（美国）：iOS 上 Dodam Plus 的付款处理', 'Google LLC（美国）：Android 上 Dodam Plus 的付款处理'],
    retain: [
      '本应用保存的所有信息都只在您的设备上。使用设置中的"重新开始"或删除本应用后即会清除。',
      '您导出的备份文件会保留在您保存的位置，由您自行管理。不再需要时请自行删除。',
      '购买记录由 Apple 或 Google 按照各自的政策保存。',
    ],
    rights: ['您可以随时查看、修改或删除您的信息。'],
    rightsList: [
      '修改记录：直接在本应用的各个画面中修改',
      '删除设备内全部数据：设置 →"重新开始"，或删除本应用',
      '导出的文件：在您保存的位置自行删除',
      '照片和通知权限：在设备设置中更改',
    ],
    rightsTail: '更换设备时，可用"从文件恢复"迁移记录，并在 Dodam Plus 画面中用"恢复购买"迁移购买。',
    children: [
      '本应用供父母和监护人使用。有关孩子的信息由父母或监护人输入，并只保留在设备上。',
      '运营者不会向儿童收集信息。',
    ],
    contact: '如有个人信息相关问题，请通过以下方式联系我们。',
    contactList: [`运营者：${OPERATOR}`, `邮箱：<a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ 记录只留在您的设备上',
    info: '没有注册、服务器、广告和使用分析。本应用不会把您的记录和照片发送到任何地方。在外部处理的只有 Dodam Plus 的商店付款。',
    footerTerms: '服务条款',
  },
  vi: {
    intro: 'Dodam (도담, sau đây gọi là "Ứng dụng") xử lý thông tin cho các mục đích sau.',
    purpose: [
      'Ghi lại sự lớn khôn của con và hiển thị trên biểu đồ tăng trưởng',
      'Hiển thị và nhắc lịch tiêm chủng, khám sức khỏe định kỳ cho trẻ và các thủ tục hành chính tại Hàn Quốc',
      'Hiển thị ảnh của bạn theo tháng tuổi của bé, và tạo ảnh có tem tháng tuổi, bưu thiếp, sách ảnh và video lớn khôn',
      'Hỗ trợ điền bảng kiểm trước tiêm chủng, và thẻ đi khám giúp bạn nói về triệu chứng tại bệnh viện',
      'Xử lý giao dịch mua một lần trong ứng dụng (Dodam Plus)',
    ],
    collectIntro: 'Ứng dụng hoạt động mà không cần đăng ký hay đăng nhập. Chúng tôi không vận hành máy chủ nào, và Ứng dụng không có quảng cáo, phân tích sử dụng hay báo cáo sự cố. Khi chạy, Ứng dụng không dùng internet ngoại trừ việc xử lý mua hàng của chính cửa hàng ứng dụng. Mọi thông tin bạn nhập chỉ được lưu trên thiết bị của bạn và không bao giờ được gửi cho chúng tôi.',
    items: [
      ['👶', 'Thông tin của con', 'Tên, ngày sinh, giới tính (không bắt buộc) và quốc tịch của con (không bắt buộc, chỉ dùng để hiển thị các thủ tục phù hợp).'],
      ['📏', 'Ghi chép tăng trưởng và lịch', 'Số đo chiều cao, cân nặng, vòng đầu, dấu hoàn thành các mục trong lịch, và ghi chép "Lần đầu tiên".'],
      ['📝', 'Câu trả lời trong trợ lý bảng kiểm', 'Những câu trả lời bạn giữ lại trong trợ lý bảng kiểm trước tiêm chủng. Trợ lý không bao giờ lưu tên hay số định danh; bạn tự viết những thông tin đó lên bảng kiểm giấy.'],
      ['🖼️', 'Tham chiếu ảnh và cài đặt', 'ID của ảnh bạn đã ẩn hoặc đã chọn cho "Lần đầu tiên" và sách ảnh (kèm thời điểm chụp và tên tệp để tìm lại), cùng các cài đặt của Ứng dụng. Bản thân ảnh không được sao chép vào Ứng dụng.'],
    ],
    permIntro: 'Ứng dụng chỉ xin các quyền dưới đây khi bạn dùng tính năng liên quan. Bạn có thể thay đổi bất cứ lúc nào trong cài đặt thiết bị.',
    perms: [
      '<strong>Ảnh (đọc)</strong>: để hiển thị ảnh của bạn theo nhóm tháng tuổi của bé. Ảnh chỉ được đọc trên thiết bị và không bao giờ được truyền đi. Trên iOS, Ứng dụng vẫn dùng được với quyền truy cập giới hạn (chỉ những ảnh bạn chọn).',
      '<strong>Ảnh (thêm)</strong>: để lưu ảnh có tem tháng tuổi, bưu thiếp, trang sách ảnh và video lớn khôn bạn tạo vào thư viện ảnh.',
      '<strong>Thông báo</strong>: để nhắc lịch tiêm chủng, thời gian khám sức khỏe, hạn chót thủ tục và ngày kỷ niệm. Lời nhắc được hẹn trên thiết bị, không có máy chủ đẩy thông báo. Bạn có thể tắt trong cài đặt của Ứng dụng hoặc cài đặt thiết bị.',
      '<strong>Tệp</strong>: "Xuất dữ liệu" tạo một tệp sao lưu và lưu vào nơi bạn chọn. "Khôi phục từ tệp" đọc lại tệp đó. Tệp chứa thông tin của con, ghi chép tăng trưởng, dấu hoàn thành, "Lần đầu tiên", câu trả lời bảng kiểm và cài đặt (chỉ có ID ảnh, không có bản thân ảnh).',
    ],
    iapHead: 'Mua trong ứng dụng (Dodam Plus)',
    iap: [
      'Dodam Plus là giao dịch mua một lần (không tiêu hao) do Apple App Store hoặc Google Play xử lý.',
      'Ứng dụng không nhận thông tin thẻ thanh toán của bạn. Việc bạn đã mua Plus hay chưa được kiểm tra trên thiết bị với cửa hàng, và chúng tôi không vận hành máy chủ biên nhận nào.',
      'Mã mời (dành cho giáo viên) cũng có thể mở Plus. Mã được kiểm tra trên thiết bị và không được gửi đi đâu.',
      `Chính sách quyền riêng tư của Apple: ${APPLE_PRIVACY}<br />Chính sách quyền riêng tư của Google: ${GOOGLE_PRIVACY}`,
    ],
    third: ['Chúng tôi không thu thập thông tin của bạn, vì vậy không cung cấp cho bên thứ ba.', 'Việc xử lý bên ngoài chỉ gồm những mục sau:'],
    thirdList: [
      'Mua hàng: việc thanh toán Dodam Plus do Apple hoặc Google xử lý theo chính sách quyền riêng tư của họ (xem Điều 4)',
      'Giọng nói của thẻ đi khám: dùng âm thanh tiếng Hàn dựng sẵn kèm trong Ứng dụng, và dùng công cụ giọng nói có sẵn của thiết bị khi cần; Ứng dụng không gửi thông tin ra bên ngoài cho việc này (cách công cụ giọng nói của thiết bị xử lý tuân theo chính sách của nhà sản xuất và hệ điều hành)',
    ],
    intl: ['Ứng dụng chỉ phát hành tại Hàn Quốc. Tuy nhiên, việc xử lý thanh toán của các công ty sau có thể diễn ra bên ngoài Hàn Quốc:', 'Apple Inc. (Hoa Kỳ): xử lý thanh toán Dodam Plus trên iOS', 'Google LLC (Hoa Kỳ): xử lý thanh toán Dodam Plus trên Android'],
    retain: [
      'Mọi thông tin Ứng dụng lưu đều chỉ nằm trên thiết bị của bạn. Thông tin sẽ bị xóa khi bạn dùng Cài đặt → "Làm lại từ đầu" hoặc gỡ Ứng dụng.',
      'Tệp sao lưu bạn đã xuất vẫn nằm ở nơi bạn lưu và do bạn tự quản lý. Khi không cần nữa, vui lòng tự xóa.',
      'Hồ sơ mua hàng do Apple hoặc Google lưu giữ theo chính sách của họ.',
    ],
    rights: ['Bạn có thể xem, sửa hoặc xóa thông tin của mình bất cứ lúc nào.'],
    rightsList: [
      'Sửa ghi chép: trực tiếp trên từng màn hình của Ứng dụng',
      'Xóa toàn bộ dữ liệu trên thiết bị: Cài đặt → "Làm lại từ đầu", hoặc gỡ Ứng dụng',
      'Tệp đã xuất: tự xóa ở nơi bạn đã lưu',
      'Quyền truy cập ảnh và thông báo: thay đổi trong cài đặt thiết bị',
    ],
    rightsTail: 'Khi chuyển sang thiết bị mới, dùng "Khôi phục từ tệp" để chuyển ghi chép và "Khôi phục giao dịch" trên màn hình Dodam Plus để chuyển giao dịch mua.',
    children: [
      'Ứng dụng dành cho cha mẹ và người giám hộ sử dụng. Thông tin về con do cha mẹ hoặc người giám hộ nhập và chỉ nằm trên thiết bị.',
      'Chúng tôi không thu thập thông tin từ trẻ em.',
    ],
    contact: 'Nếu có thắc mắc về quyền riêng tư, vui lòng liên hệ với chúng tôi bên dưới.',
    contactList: [`Nhà vận hành: ${OPERATOR}`, `Email: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ Ghi chép chỉ nằm trên thiết bị của bạn',
    info: 'Không đăng ký, không máy chủ, không quảng cáo và không phân tích sử dụng. Ứng dụng không gửi ghi chép hay ảnh của bạn đi đâu cả. Việc xử lý bên ngoài duy nhất là thanh toán qua cửa hàng cho Dodam Plus.',
    footerTerms: 'Điều khoản dịch vụ',
  },
};

// ─────────────────────────── 이용약관 본문
const TERMS = {
  en: {
    s1h: 'Article 1 (Purpose)', s1: `These Terms govern the conditions and procedures for using the mobile application "Dodam" (the "App") provided by ${OPERATOR} (the "Operator"), and the rights, obligations, and responsibilities between the Operator and the user.`,
    s2h: 'Article 2 (Services)', s2: 'The App provides the following services.',
    s2list: [
      'Growth records and growth charts (height, weight, head circumference)',
      'Calendar and reminders for vaccinations, checkups and paperwork for children in Korea',
      'Photo album by age in months, age stamps, postcards, photobooks and growth movies',
      'Vaccination screening-form helper and hospital card (Korean phrases with audio)',
      'Additional designs and features through a one-time in-app purchase (Dodam Plus)',
    ],
    s3h: 'Article 3 (User Obligations)', s3: 'The user must not do the following.',
    s3list: ['Reproduce, redistribute, or commercially use the App\'s content (text, illustrations, music) without permission', 'Attempt to reverse-engineer, decompile, or extract the source of the App', 'Interfere with the normal operation of the App or infringe the Operator\'s rights'],
    s4h: '⚠️ Article 4 (Limitation of Liability)',
    s4: [
      '① The schedule, vaccination and checkup information and the hospital-card phrases are reference aids based on public sources as of November 2026. Schedules and rules may change, so always follow the guidance of medical staff and official notices.',
      '② The App does not provide medical advice or diagnosis. The hospital card only helps you describe symptoms in Korean and does not judge them.',
      '③ Growth charts show only where a measurement falls among percentiles and do not judge your child\'s development. If you have concerns, please consult medical staff.',
      '④ The Operator is not liable for damages caused by force majeure, device failure, or outages of third-party services (Apple, Google, etc.).',
    ],
    s5h: 'Article 5 (Records and Backup Files)', s5: 'Records are stored only on the user\'s device, and the Operator keeps no copy of them. If the App is deleted or the device is lost without a backup, records cannot be recovered. Exported backup files contain information about your child, so you are responsible for keeping them safe.',
    s6h: 'Article 6 (Content and Copyright)', s6: 'The text, illustrations, music and other content in the App belong to the Operator and may not be extracted or redistributed without permission. Photos, postcards, photobooks and movies you make from your own photos are yours to keep and share for personal use.',
    s7h: 'Article 7 (Dodam Plus and Refunds)', s7: 'Dodam Plus is a one-time purchase made through the in-app purchase system of the Apple App Store or Google Play, and refunds follow each store\'s refund policy. The Operator does not provide direct refunds outside the stores. On a new device, use "Restore purchase" on the Dodam Plus screen. Plus unlocked with an invite code is provided free of charge.',
    s8h: 'Article 8 (Changes and Termination)', s8: 'The Operator may change features or discontinue the service after prior notice. For essential changes to features provided through paid purchase, the Operator will consider reasonable compensation or refund.',
    s9h: 'Article 9 (Dispute Resolution)', s9: 'Any dispute between the Operator and the user shall be resolved through good-faith consultation; where consultation is not possible, the competent court under the Civil Procedure Act of the Republic of Korea shall have jurisdiction.',
    s10h: 'Article 10 (Contact)', s10list: [`Operator: ${OPERATOR}`, `Email: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    footerPrivacy: 'Privacy Policy',
  },
  ko: {
    s1h: '제1조 (목적)', s1: `본 약관은 ${OPERATOR}(이하 "운영자")이 제공하는 모바일 애플리케이션 "도담"(이하 "앱")의 이용 조건과 절차, 운영자와 이용자 간의 권리, 의무 및 책임 사항을 규정합니다.`,
    s2h: '제2조 (서비스 내용)', s2: '앱은 다음 서비스를 제공합니다.',
    s2list: [
      '성장 기록과 성장 곡선(키, 몸무게, 머리둘레)',
      '한국의 예방접종, 영유아 건강검진, 행정 수속 일정 달력과 알림',
      '월령별 사진 앨범, 월령 스탬프, 엽서, 포토북, 성장 영상',
      '예방접종 예진표 도우미와 병원 카드(음성이 있는 한국어 문장)',
      '한 번 결제하는 인앱 구매(도담 플러스)를 통한 추가 디자인과 기능',
    ],
    s3h: '제3조 (이용자의 의무)', s3: '이용자는 다음 행위를 해서는 안 됩니다.',
    s3list: ['앱의 콘텐츠(글, 그림, 음악)를 무단으로 복제, 재배포하거나 상업적으로 이용하는 행위', '앱의 역공학, 디컴파일, 소스 추출을 시도하는 행위', '앱의 정상 동작을 방해하거나 운영자의 권리를 침해하는 행위'],
    s4h: '⚠️ 제4조 (운영자의 책임 제한)',
    s4: [
      '① 앱의 일정, 예방접종과 건강검진 정보, 병원 카드 문장은 2026년 11월 기준의 공개 자료를 바탕으로 한 참고 자료입니다. 일정과 제도는 바뀔 수 있으므로 항상 의료진의 안내와 공식 공지를 따라 주세요.',
      '② 앱은 의료 조언이나 진단을 제공하지 않습니다. 병원 카드는 증상을 한국어로 전하는 것을 도울 뿐이며 증상을 판단하지 않습니다.',
      '③ 성장 곡선은 측정값이 백분위 중 어디에 있는지만 보여 주며 아이의 발달을 판단하지 않습니다. 걱정되는 점이 있으면 의료진과 상담해 주세요.',
      '④ 천재지변, 기기 고장, 제3자 서비스(Apple, Google 등)의 장애로 발생한 손해에 대해 운영자는 책임지지 않습니다.',
    ],
    s5h: '제5조 (기록과 백업 파일)', s5: '기록은 이용자의 기기에만 저장되며 운영자는 그 사본을 갖고 있지 않습니다. 백업 없이 앱을 삭제하거나 기기를 잃어버리면 기록을 되살릴 수 없습니다. 내보낸 백업 파일에는 아이에 관한 정보가 들어 있으므로 안전하게 보관할 책임은 이용자에게 있습니다.',
    s6h: '제6조 (콘텐츠와 저작권)', s6: '앱의 글, 그림, 음악 등 콘텐츠의 권리는 운영자에게 있으며 무단으로 추출하거나 재배포할 수 없습니다. 이용자가 자신의 사진으로 만든 사진, 엽서, 포토북, 영상은 개인 용도로 자유롭게 보관하고 공유할 수 있습니다.',
    s7h: '제7조 (도담 플러스와 환불)', s7: '도담 플러스는 Apple App Store 또는 Google Play의 인앱 결제 시스템으로 한 번 결제하는 상품이며, 환불은 각 스토어의 환불 정책을 따릅니다. 운영자는 스토어를 통하지 않은 직접 환불을 제공하지 않습니다. 새 기기에서는 도담 플러스 화면의 "구매 복원"을 이용해 주세요. 초대 코드로 연 플러스는 무료로 제공됩니다.',
    s8h: '제8조 (서비스 변경 및 종료)', s8: '운영자는 사전 고지 후 앱의 기능을 변경하거나 서비스를 종료할 수 있습니다. 다만 유료 결제로 제공되는 기능의 본질적 변경 시에는 합리적 범위 내에서 보상 또는 환불을 고려합니다.',
    s9h: '제9조 (분쟁 해결)', s9: '본 약관과 관련하여 운영자와 이용자 간에 분쟁이 발생한 경우 양자는 성실히 협의하여 해결하며, 협의가 불가능한 경우 대한민국 민사소송법에 따른 관할 법원에 따릅니다.',
    s10h: '제10조 (문의)', s10list: [`운영자: ${OPERATOR}`, `이메일: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    footerPrivacy: '개인정보처리방침',
  },
  ja: {
    s1h: '第1条（目的）', s1: `本規約は、${OPERATOR}（以下「運営者」）が提供するモバイルアプリケーション「ドダム」（以下「本アプリ」）の利用条件と手続き、運営者と利用者の間の権利、義務および責任事項を定めます。`,
    s2h: '第2条（サービス内容）', s2: '本アプリは次のサービスを提供します。',
    s2list: [
      '成長の記録と成長曲線（身長、体重、頭囲）',
      '韓国での予防接種、乳幼児健診、行政手続きのカレンダーとお知らせ',
      '月齢ごとの写真アルバム、月齢スタンプ、はがき、フォトブック、成長ムービー',
      '予防接種の予診票の記入補助と病院カード（音声付きの韓国語の文）',
      '買い切りのアプリ内課金（ドダム プラス）による追加のデザインと機能',
    ],
    s3h: '第3条（利用者の義務）', s3: '利用者は次の行為をしてはなりません。',
    s3list: ['本アプリのコンテンツ（文章、イラスト、音楽）を無断で複製、再配布、または商業利用すること', '本アプリのリバースエンジニアリング、逆コンパイル、ソースの抽出を試みること', '本アプリの正常な動作を妨げ、または運営者の権利を侵害する行為'],
    s4h: '⚠️ 第4条（運営者の責任制限）',
    s4: [
      '① 本アプリのスケジュール、予防接種と健診の情報、病院カードの文は、2026年11月時点の公開資料にもとづく参考情報です。日程や制度は変わることがあるため、必ず医療スタッフの案内と公式のお知らせに従ってください。',
      '② 本アプリは医療上の助言や診断を行いません。病院カードは症状を韓国語で伝えるお手伝いをするだけで、症状を判断するものではありません。',
      '③ 成長曲線は、測定値が百分位のどのあたりにあるかを示すだけで、お子さまの発達を判断するものではありません。気になることがあれば、医療スタッフにご相談ください。',
      '④ 天災地変、端末の故障、第三者サービス（Apple、Googleなど）の障害により生じた損害について、運営者は責任を負いません。',
    ],
    s5h: '第5条（記録とバックアップファイル）', s5: '記録は利用者の端末の中にだけ保存され、運営者はその写しを持っていません。バックアップをとらずに本アプリを削除したり端末をなくしたりすると、記録は元に戻せません。書き出したバックアップファイルにはお子さまの情報が入っているため、安全に保管する責任は利用者にあります。',
    s6h: '第6条（コンテンツと著作権）', s6: '本アプリの文章、イラスト、音楽などのコンテンツの権利は運営者にあり、無断で取り出したり再配布したりすることはできません。利用者がご自身の写真で作った写真、はがき、フォトブック、ムービーは、個人の用途で自由に保存、共有できます。',
    s7h: '第7条（ドダム プラスと返金）', s7: 'ドダム プラスは、Apple App StoreまたはGoogle Playのアプリ内課金で購入する買い切りの商品で、返金は各ストアの返金ポリシーに従います。運営者はストアを通さない直接の返金は行いません。新しい端末では、ドダム プラスの画面の「購入を復元」をご利用ください。招待コードで使えるようになったプラスは無料で提供されます。',
    s8h: '第8条（サービスの変更および終了）', s8: '運営者は事前に告知したうえで、本アプリの機能を変更し、またはサービスを終了できます。ただし有料課金で提供される機能を本質的に変更するときは、合理的な範囲で補償または返金を検討します。',
    s9h: '第9条（紛争解決）', s9: '本規約に関して運営者と利用者の間に紛争が生じた場合、両者は誠実に協議して解決し、協議ができない場合は大韓民国民事訴訟法による管轄裁判所に従います。',
    s10h: '第10条（お問い合わせ）', s10list: [`運営者: ${OPERATOR}`, `メール: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    footerPrivacy: 'プライバシーポリシー',
  },
  zh: {
    s1h: '第1条（目的）', s1: `本条款规定 ${OPERATOR}（以下称"运营者"）提供的移动应用"Dodam"（以下称"本应用"）的使用条件与流程，以及运营者与用户之间的权利、义务和责任事项。`,
    s2h: '第2条（服务内容）', s2: '本应用提供以下服务。',
    s2list: [
      '成长记录与成长曲线（身高、体重、头围）',
      '韩国预防接种、婴幼儿健康检查及行政手续的日程与提醒',
      '按月龄整理的照片相册、月龄贴、明信片、照片书和成长视频',
      '预防接种预诊表助手和看病卡片（附语音的韩语句子）',
      '通过一次性应用内购买（Dodam Plus）提供更多款式和功能',
    ],
    s3h: '第3条（用户义务）', s3: '用户不得进行以下行为。',
    s3list: ['未经许可复制、再分发或商业使用本应用的内容（文字、插图、音乐）', '尝试对本应用进行逆向工程、反编译或提取源代码', '妨碍本应用正常运行或侵犯运营者权利的行为'],
    s4h: '⚠️ 第4条（运营者的责任限制）',
    s4: [
      '① 本应用中的日程、预防接种与健康检查信息以及看病卡片的句子，是根据截至2026年11月的公开资料整理的参考信息。日程和制度可能会变化，请务必以医护人员的指导和官方通知为准。',
      '② 本应用不提供医疗建议或诊断。看病卡片只是帮助您用韩语说明症状，并不对症状作出判断。',
      '③ 成长曲线只显示测量值在百分位中的位置，不对孩子的发育作出判断。如有担心，请咨询医护人员。',
      '④ 对于因不可抗力、设备故障或第三方服务（Apple、Google 等）故障造成的损害，运营者不承担责任。',
    ],
    s5h: '第5条（记录与备份文件）', s5: '记录仅保存在用户的设备上，运营者不持有任何副本。如未备份就删除本应用或丢失设备，记录将无法恢复。导出的备份文件包含孩子的信息，妥善保管的责任在于用户。',
    s6h: '第6条（内容与著作权）', s6: '本应用中的文字、插图、音乐等内容的权利归运营者所有，未经许可不得提取或再分发。用户用自己的照片制作的照片、明信片、照片书和视频，可在个人用途范围内自由保存和分享。',
    s7h: '第7条（Dodam Plus 与退款）', s7: 'Dodam Plus 是通过 Apple App Store 或 Google Play 应用内购买系统一次性购买的项目，退款遵循各商店的退款政策。运营者不提供绕过商店的直接退款。在新设备上，请使用 Dodam Plus 画面中的"恢复购买"。通过邀请码开启的 Plus 免费提供。',
    s8h: '第8条（服务变更与终止）', s8: '运营者可在事先通知后变更应用功能或终止服务。但对付费购买所提供功能进行实质性变更时，将在合理范围内考虑补偿或退款。',
    s9h: '第9条（争议解决）', s9: '就本条款，运营者与用户之间发生争议时，双方应本着诚信协商解决；无法协商时，以大韩民国民事诉讼法规定的管辖法院为准。',
    s10h: '第10条（联系方式）', s10list: [`运营者：${OPERATOR}`, `邮箱：<a href="mailto:${EMAIL}">${EMAIL}</a>`],
    footerPrivacy: '隐私政策',
  },
  vi: {
    s1h: 'Điều 1 (Mục đích)', s1: `Điều khoản này quy định điều kiện và quy trình sử dụng ứng dụng di động "Dodam" (sau đây gọi là "Ứng dụng") do ${OPERATOR} (sau đây gọi là "Nhà vận hành") cung cấp, cùng các quyền, nghĩa vụ và trách nhiệm giữa Nhà vận hành và người dùng.`,
    s2h: 'Điều 2 (Dịch vụ)', s2: 'Ứng dụng cung cấp các dịch vụ sau.',
    s2list: [
      'Ghi chép tăng trưởng và biểu đồ tăng trưởng (chiều cao, cân nặng, vòng đầu)',
      'Lịch và lời nhắc tiêm chủng, khám sức khỏe định kỳ cho trẻ và thủ tục hành chính tại Hàn Quốc',
      'Album ảnh theo tháng tuổi, tem tháng tuổi, bưu thiếp, sách ảnh và video lớn khôn',
      'Trợ lý bảng kiểm trước tiêm chủng và thẻ đi khám (câu tiếng Hàn kèm âm thanh)',
      'Thêm mẫu thiết kế và tính năng qua giao dịch mua một lần trong ứng dụng (Dodam Plus)',
    ],
    s3h: 'Điều 3 (Nghĩa vụ của người dùng)', s3: 'Người dùng không được thực hiện các hành vi sau.',
    s3list: ['Sao chép, phân phối lại hoặc sử dụng thương mại nội dung của Ứng dụng (chữ, hình minh họa, âm nhạc) mà không được phép', 'Cố gắng dịch ngược, phân rã hoặc trích xuất mã nguồn của Ứng dụng', 'Cản trở hoạt động bình thường của Ứng dụng hoặc xâm phạm quyền của Nhà vận hành'],
    s4h: '⚠️ Điều 4 (Giới hạn trách nhiệm)',
    s4: [
      '① Thông tin về lịch, tiêm chủng, khám sức khỏe và các câu trong thẻ đi khám là tài liệu tham khảo dựa trên các nguồn công khai tính đến tháng 11 năm 2026. Lịch và quy định có thể thay đổi, vì vậy hãy luôn làm theo hướng dẫn của nhân viên y tế và thông báo chính thức.',
      '② Ứng dụng không đưa ra lời khuyên y tế hay chẩn đoán. Thẻ đi khám chỉ giúp bạn nói về triệu chứng bằng tiếng Hàn và không đánh giá triệu chứng.',
      '③ Biểu đồ tăng trưởng chỉ cho thấy số đo nằm ở vị trí nào trong các bách phân vị và không đánh giá sự phát triển của con. Nếu có điều lo lắng, vui lòng hỏi ý kiến nhân viên y tế.',
      '④ Nhà vận hành không chịu trách nhiệm về thiệt hại do bất khả kháng, hỏng thiết bị hoặc sự cố của dịch vụ bên thứ ba (Apple, Google, v.v.).',
    ],
    s5h: 'Điều 5 (Ghi chép và tệp sao lưu)', s5: 'Ghi chép chỉ được lưu trên thiết bị của người dùng và Nhà vận hành không giữ bản sao nào. Nếu gỡ Ứng dụng hoặc mất thiết bị khi chưa sao lưu, ghi chép sẽ không thể khôi phục. Tệp sao lưu đã xuất chứa thông tin về con bạn, vì vậy người dùng có trách nhiệm giữ tệp an toàn.',
    s6h: 'Điều 6 (Nội dung và bản quyền)', s6: 'Quyền đối với chữ, hình minh họa, âm nhạc và các nội dung khác trong Ứng dụng thuộc về Nhà vận hành, và không được trích xuất hay phân phối lại khi chưa được phép. Ảnh, bưu thiếp, sách ảnh và video bạn tạo từ ảnh của chính mình là của bạn, có thể giữ và chia sẻ cho mục đích cá nhân.',
    s7h: 'Điều 7 (Dodam Plus và hoàn tiền)', s7: 'Dodam Plus là giao dịch mua một lần qua hệ thống mua trong ứng dụng của Apple App Store hoặc Google Play, và việc hoàn tiền tuân theo chính sách của từng cửa hàng. Nhà vận hành không hoàn tiền trực tiếp bên ngoài cửa hàng. Trên thiết bị mới, hãy dùng "Khôi phục giao dịch" trên màn hình Dodam Plus. Plus được mở bằng mã mời được cung cấp miễn phí.',
    s8h: 'Điều 8 (Thay đổi và chấm dứt dịch vụ)', s8: 'Nhà vận hành có thể thay đổi tính năng hoặc ngừng dịch vụ sau khi thông báo trước. Tuy nhiên, đối với những thay đổi thiết yếu về tính năng được cung cấp qua mua trả phí, Nhà vận hành sẽ cân nhắc bồi thường hoặc hoàn tiền trong phạm vi hợp lý.',
    s9h: 'Điều 9 (Giải quyết tranh chấp)', s9: 'Mọi tranh chấp giữa Nhà vận hành và người dùng sẽ được giải quyết thông qua thương lượng thiện chí; nếu không thể thương lượng, tòa án có thẩm quyền theo Luật Tố tụng Dân sự của Hàn Quốc sẽ có thẩm quyền.',
    s10h: 'Điều 10 (Liên hệ)', s10list: [`Nhà vận hành: ${OPERATOR}`, `Email: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    footerPrivacy: 'Chính sách quyền riêng tư',
  },
};

// ─────────────────────────── HTML 조립 헬퍼
const articleFmt = {
  en: (n) => `Article ${n}`, ko: (n) => `제${n}조`, ja: (n) => `第${n}条`, zh: (n) => `第${n}条`, vi: (n) => `Điều ${n}`,
};
// 개인정보처리방침 10개 섹션 이름 (조 번호는 articleFmt로 붙인다)
const PRIV_NAMES = {
  en: ['Purpose of Processing', 'Information Stored on Your Device', 'Device Permissions', 'In-App Purchase', 'Provision to Third Parties', 'International Transfer', 'Retention and Deletion', 'Your Rights', 'Children\'s Information', 'Privacy Officer'],
  ko: ['개인정보의 처리 목적', '기기에 저장되는 항목', '기기 접근 권한', '인앱 구매', '개인정보의 제3자 제공', '개인정보의 국외 이전', '개인정보의 보유 및 파기', '이용자의 권리', '아동의 개인정보', '개인정보 보호책임자'],
  ja: ['個人情報の取り扱いの目的', '端末に保存される項目', '端末へのアクセス権限', 'アプリ内課金', '第三者提供', '国外移転', '保存期間と削除', '利用者の権利', 'お子さまの情報', '個人情報保護責任者'],
  zh: ['处理目的', '保存在设备上的项目', '设备访问权限', '应用内购买', '向第三方提供', '跨境传输', '保留与删除', '用户权利', '儿童信息', '个人信息保护负责人'],
  vi: ['Mục đích xử lý', 'Thông tin lưu trên thiết bị', 'Quyền truy cập thiết bị', 'Mua trong ứng dụng', 'Cung cấp cho bên thứ ba', 'Chuyển ra nước ngoài', 'Lưu giữ và xóa', 'Quyền của người dùng', 'Thông tin của trẻ em', 'Người phụ trách bảo vệ thông tin cá nhân'],
};

const ul = (items) => `      <ul>\n${items.map((i) => `        <li>${i}</li>`).join('\n')}\n      </ul>`;
const paras = (arr) => arr.map((p) => `      <p>${p}</p>`).join('\n');
const card = (h, inner, cls = 'card') => `    <section class="${cls}">\n      <h2>${h}</h2>\n${inner}\n    </section>`;
const ph = (lang, n) => `${articleFmt[lang](n)} (${PRIV_NAMES[lang][n - 1]})`;

function langNav(base, current) {
  const links = LANGS.map((l) =>
    l === current ? `<strong>${LANG_LABEL[l]}</strong>` : `<a href="${file(base, l)}">${LANG_LABEL[l]}</a>`,
  ).join(' · ');
  return `    <nav class="lang-nav">${T.langLabel[current]}: ${links}</nav>`;
}

function page(lang, base, title, effectiveLine, bodyCards, footer) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index,follow" />
  <title>${title} - ${APP_NAME[lang]}</title>
  <link rel="stylesheet" href="../style.css" />
</head>
<body>
  <main class="container">
    <a class="back-link" href="${file('index', lang)}">${T.backToList[lang]}</a>
    <h1>${title}</h1>
    <div class="effective">${effectiveLine}</div>
${langNav(base, lang)}

${bodyCards}

    <div class="footer">
      ${footer}
    </div>
  </main>
</body>
</html>
`;
}

function buildPrivacy(lang) {
  const p = PRIVACY[lang];
  const eff = `${T.effectiveWord[lang]}: ${EFFECTIVE[lang]} · ${T.appWord[lang]}: ${APP_NAME[lang]}`;
  const collectionBox = `      <p>${p.collectIntro}</p>
      <div class="collection-box">
${p.items.map(([icon, title, desc]) => `        <div class="collection-item">
          <div class="icon">${icon}</div>
          <div>
            <div class="title">${title}</div>
            <div class="desc">${desc}</div>
          </div>
        </div>`).join('\n')}
      </div>`;
  const cards = [
    card(ph(lang, 1), `      <p>${p.intro}</p>\n${ul(p.purpose)}`),
    card(ph(lang, 2), collectionBox),
    card(ph(lang, 3), `      <p>${p.permIntro}</p>\n${ul(p.perms)}`),
    card(ph(lang, 4), paras(p.iap)),
    card(ph(lang, 5), paras(p.third) + '\n' + ul(p.thirdList)),
    card(ph(lang, 6), `      <p>${p.intl[0]}</p>\n` + ul(p.intl.slice(1))),
    card(ph(lang, 7), paras(p.retain)),
    card(ph(lang, 8), `      <p>${p.rights[0]}</p>\n${ul(p.rightsList)}\n      <p>${p.rightsTail}</p>`),
    card(ph(lang, 9), paras(p.children)),
    card(ph(lang, 10), `      <p>${p.contact}</p>\n${ul(p.contactList)}`),
    card(p.infoHead, `      <p>${p.info}</p>`, 'card info-card'),
  ].join('\n\n');
  const footer = `© 2026 ${OPERATOR} · <a href="${file('terms', lang)}">${p.footerTerms}</a>`;
  return page(lang, 'privacy', T.privacyTitle[lang], eff, cards, footer);
}

function buildTerms(lang) {
  const t = TERMS[lang];
  const eff = `${T.effectiveWord[lang]}: ${EFFECTIVE[lang]} · ${T.appWord[lang]}: ${APP_NAME[lang]}`;
  const cards = [
    card(t.s1h, `      <p>${t.s1}</p>`),
    card(t.s2h, `      <p>${t.s2}</p>\n${ul(t.s2list)}`),
    card(t.s3h, `      <p>${t.s3}</p>\n${ul(t.s3list)}`),
    card(t.s4h, paras(t.s4), 'card warning-card'),
    card(t.s5h, `      <p>${t.s5}</p>`),
    card(t.s6h, `      <p>${t.s6}</p>`),
    card(t.s7h, `      <p>${t.s7}</p>`),
    card(t.s8h, `      <p>${t.s8}</p>`),
    card(t.s9h, `      <p>${t.s9}</p>`),
    card(t.s10h, ul(t.s10list)),
  ].join('\n\n');
  const footer = `© 2026 ${OPERATOR} · <a href="${file('privacy', lang)}">${t.footerPrivacy}</a>`;
  return page(lang, 'terms', T.termsTitle[lang], eff, cards, footer);
}

function buildIndex(lang) {
  const eff = T.tagline[lang];
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index,follow" />
  <title>${APP_NAME[lang]} - ${T.privacyTitle[lang]} · ${T.termsTitle[lang]}</title>
  <link rel="stylesheet" href="../style.css" />
</head>
<body>
  <main class="container">
    <a class="back-link" href="../">${T.backToList[lang]}</a>
    <h1>${APP_NAME[lang]}</h1>
    <p class="effective">${eff}</p>
${langNav('index', lang)}

    <div class="doc-links">
      <a class="doc-link" href="${file('privacy', lang)}">${T.seePrivacy[lang]}</a>
      <a class="doc-link" href="${file('terms', lang)}">${T.seeTerms[lang]}</a>
    </div>

    <div class="footer">© 2026 ${OPERATOR}</div>
  </main>
</body>
</html>
`;
}

for (const lang of LANGS) {
  writeFileSync(`${file('privacy', lang)}`, buildPrivacy(lang));
  writeFileSync(`${file('terms', lang)}`, buildTerms(lang));
  writeFileSync(`${file('index', lang)}`, buildIndex(lang));
}
console.log('생성 완료: ', LANGS.length * 3, '개 파일');
