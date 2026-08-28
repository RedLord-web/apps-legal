// 배우GO 법적 문서 생성기 — 5개 언어(en/ko/ja/zh/vi) × (개인정보처리방침·이용약관·랜딩)
// 언어 간 구조를 한 소스에서 통일한다. 실행: node gen-baeugo.mjs
//
// ⚠️ 앱 실제 동작 기준(2026-08 갱신):
//   - AI 기능 없음(쓰GO=모범답안·자가채점). 외부 텍스트 전송 없음.
//   - 광고 없음(AdMob 미사용).
//   - 유일한 외부 데이터 처리 = 인앱 구독(RevenueCat + 앱스토어). docs/PRIVACY_LABELS.md와 일치.
import { writeFileSync } from 'node:fs';

const EFFECTIVE = { en: 'August 28, 2026', ko: '2026년 08월 28일', ja: '2026年08月28日', zh: '2026年08月28日', vi: 'Ngày 28 tháng 8, 2026' };
const OPERATOR = '매듭연구소'; // 기존 저장소 표기 유지
const EMAIL = 'knotlabdev@gmail.com';

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
    en: 'Korean learning + TOPIK exam prep',
    ko: '한국어 학습 + TOPIK 시험 준비',
    ja: '韓国語学習 + TOPIK試験対策',
    zh: '韩语学习 + TOPIK 考试备考',
    vi: 'Học tiếng Hàn + luyện thi TOPIK',
  },
  backToList: { en: '← Back to app list', ko: '← 앱 목록으로', ja: '← アプリ一覧へ', zh: '← 返回应用列表', vi: '← Về danh sách ứng dụng' },
  langLabel: { en: 'Language', ko: '언어', ja: '言語', zh: '语言', vi: 'Ngôn ngữ' },
  seePrivacy: { en: 'Privacy Policy', ko: '개인정보처리방침', ja: 'プライバシーポリシー', zh: '隐私政策', vi: 'Chính sách quyền riêng tư' },
  seeTerms: { en: 'Terms of Service', ko: '이용약관', ja: '利用規約', zh: '服务条款', vi: 'Điều khoản dịch vụ' },
};

// ─────────────────────────── 개인정보처리방침 본문
const PRIVACY = {
  en: {
    intro: 'BaeuGO (the "App") is operated with the following purposes.',
    purpose: ['Providing Korean vocabulary, grammar, and TOPIK exam-prep content', 'Managing learning progress and spaced-repetition review', 'Sending study reminder notifications', 'Processing in-app subscriptions (배우GO Plus)'],
    collectIntro: 'The App works without sign-up or login and does not itself collect personally identifying information. Learning data is stored only on your device. The items below apply only when you use certain features.',
    items: [
      ['🔔', 'Notifications', 'Used to send study reminders. You can turn them off in your device settings.'],
      ['📱', 'On-device storage', 'Learning progress, review queue, profile name, and settings are stored only on your device and are never transmitted.'],
      ['💳', 'Purchase information', 'When you subscribe to Plus, purchase data is processed through the app store and RevenueCat. See the section below.'],
    ],
    iapHead: 'In-App Purchases (배우GO Plus)',
    iap: [
      'Subscriptions are processed through Google Play or the Apple App Store together with RevenueCat, Inc. (United States), our subscription-management provider.',
      'For subscription management, receipt validation, and fraud prevention, RevenueCat processes your purchase history, an anonymous app-user identifier it generates, device and OS information, and IP-derived country. No login is required, and this data is not linked to your real-world identity.',
      'We operate no server of our own and do not separately store your data.',
      'RevenueCat Privacy Policy: <a href="https://www.revenuecat.com/privacy">revenuecat.com/privacy</a>',
    ],
    third: ['We do not provide information we directly collect to third parties.', 'However, data may be transferred to the following operators when you use their services:'],
    thirdList: ['Subscriptions: purchase history and an anonymous identifier to the app stores (Google/Apple) and RevenueCat, Inc. (see In-App Purchases)', 'Voice output: pronunciation uses pre-generated audio bundled in the App and the on-device OS speech engine; no external transmission'],
    intl: ['Because the App is offered worldwide, some data is processed on servers located outside your country:', 'RevenueCat, Inc. (United States) — purchase history and device/identifier data for subscription management', 'Apple Inc. / Google LLC — payment and subscription processing'],
    retain: ['All learning data the App stores (progress, review queue, profile name, settings) is kept only on your device and is destroyed immediately when the App is deleted.', 'Retention of purchase-related data follows the policies of the app stores and RevenueCat.'],
    rights: ['You can delete stored data at any time.'],
    rightsList: ['Learning records: App settings → Reset data', 'All on-device data: delete the App from your device', 'Purchase data: contact us below to request deletion of RevenueCat-held data'],
    rightsTail: 'If you change devices, use "Restore purchase" on the paywall to transfer your subscription.',
    contact: 'For privacy inquiries, please contact us below.',
    contactList: [`Operator: ${OPERATOR}`, `Email: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ Data Minimization',
    info: 'The App has no sign-up or login and does not itself collect personally identifying information. Learning data stays on your device. Data is processed externally only to handle your in-app subscription (app stores and RevenueCat).',
    footerTerms: 'Terms of Service',
  },
  ko: {
    intro: '배우GO(이하 "앱")는 다음의 목적으로 앱을 운영합니다.',
    purpose: ['한국어 단어·문법·TOPIK 시험 준비 콘텐츠 제공', '학습 진도 및 간격 반복 복습 관리', '학습 복습 알림 발송', '인앱 구독(배우GO Plus) 처리'],
    collectIntro: '앱 자체는 회원가입·로그인 없이 동작하며, 개인 식별 정보를 수집하지 않습니다. 학습 데이터는 이용자의 기기에만 저장됩니다. 아래 항목은 일부 기능 사용 시에만 해당됩니다.',
    items: [
      ['🔔', '알림', '학습 복습 리마인더 발송에 사용됩니다. 기기 설정에서 수신을 끌 수 있습니다.'],
      ['📱', '기기 내 저장소', '학습 진도·복습 큐·프로필 이름·설정을 기기 로컬에만 저장하며 외부로 전송하지 않습니다.'],
      ['💳', '결제 정보', 'Plus 구독 시 결제 데이터가 앱스토어와 RevenueCat을 통해 처리됩니다. 아래 항목을 참고하세요.'],
    ],
    iapHead: '인앱 구독(배우GO Plus)',
    iap: [
      '구독은 Google Play 또는 Apple App Store와, 구독 관리 제공자인 RevenueCat, Inc.(미국)를 통해 처리됩니다.',
      '구독 관리·영수증 검증·부정 방지를 위해 RevenueCat은 구매 내역, RevenueCat이 생성한 익명 앱 사용자 식별자, 기기·OS 정보, IP 기반 국가 정보를 처리합니다. 로그인이 없으며 이 데이터는 실제 신원과 연결되지 않습니다.',
      '운영자는 자체 서버를 두지 않으며 데이터를 별도로 저장하지 않습니다.',
      'RevenueCat 개인정보처리방침: <a href="https://www.revenuecat.com/privacy">revenuecat.com/privacy</a>',
    ],
    third: ['앱이 직접 수집한 개인정보는 제3자에게 제공하지 않습니다.', '단, 아래 서비스 이용 시 해당 사업자에게 데이터가 전달될 수 있습니다.'],
    thirdList: ['구독: 구매 내역 및 익명 식별자를 앱스토어(Google/Apple)와 RevenueCat, Inc.에 전달(인앱 구독 참고)', '음성 출력: 발음은 앱에 번들된 사전 생성 음원과 OS 내장 음성 엔진을 사용하며 외부 전송이 없습니다'],
    intl: ['본 앱은 전 세계에 제공되므로 일부 데이터가 이용자 국가 밖의 서버에서 처리될 수 있습니다.', 'RevenueCat, Inc.(미국) — 구독 관리를 위한 구매 내역 및 기기/식별자 데이터', 'Apple Inc. / Google LLC — 결제 및 구독 처리'],
    retain: ['본 앱이 저장하는 모든 학습 데이터(진도·복습 큐·프로필 이름·설정)는 이용자의 기기에만 저장되며, 앱 삭제 시 즉시 파기됩니다.', '결제 관련 데이터의 보유는 앱스토어와 RevenueCat의 정책을 따릅니다.'],
    rights: ['이용자는 저장된 데이터를 언제든지 삭제할 수 있습니다.'],
    rightsList: ['학습 기록: 앱 내 설정 → 데이터 초기화', '기기 내 전체 데이터: 기기에서 앱 삭제', '결제 데이터: 아래로 연락하여 RevenueCat 보유 데이터 삭제 요청'],
    rightsTail: '기기를 변경한 경우 결제 화면의 "구매 복원"으로 구독을 이전할 수 있습니다.',
    contact: '개인정보 관련 문의 사항이 있으시면 아래로 연락해주세요.',
    contactList: [`운영자: ${OPERATOR}`, `이메일: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ 최소 수집 원칙',
    info: '본 앱은 회원가입·로그인이 없으며 앱 자체는 개인 식별 정보를 수집하지 않습니다. 학습 데이터는 기기에 저장됩니다. 데이터는 인앱 구독 처리(앱스토어·RevenueCat)를 위해서만 외부에서 처리됩니다.',
    footerTerms: '이용약관',
  },
  ja: {
    intro: 'BaeuGO（以下「本アプリ」）は、次の目的でアプリを運営します。',
    purpose: ['韓国語の単語・文法・TOPIK試験対策コンテンツの提供', '学習進度および間隔反復（復習）の管理', '学習リマインダー通知の送信', 'アプリ内サブスクリプション（배우GO Plus）の処理'],
    collectIntro: '本アプリは会員登録・ログインなしで動作し、個人を識別する情報を収集しません。学習データは端末内にのみ保存されます。以下の項目は一部機能の利用時にのみ該当します。',
    items: [
      ['🔔', '通知', '学習リマインダーの送信に使用されます。端末の設定でオフにできます。'],
      ['📱', '端末内ストレージ', '学習進度・復習キュー・プロフィール名・設定を端末ローカルにのみ保存し、外部へ送信しません。'],
      ['💳', '購入情報', 'Plus購読時、購入データはアプリストアおよびRevenueCatを通じて処理されます。以下をご覧ください。'],
    ],
    iapHead: 'アプリ内課金（배우GO Plus）',
    iap: [
      'サブスクリプションは、Google PlayまたはApple App Storeと、購読管理の提供者であるRevenueCat, Inc.（米国）を通じて処理されます。',
      '購読管理・レシート検証・不正防止のため、RevenueCatは購入履歴、RevenueCatが生成する匿名のアプリユーザー識別子、端末・OS情報、IPに基づく国情報を処理します。ログインはなく、これらのデータは実在の身元と結び付きません。',
      '運営者は自社サーバーを持たず、データを別途保存しません。',
      'RevenueCatプライバシーポリシー: <a href="https://www.revenuecat.com/privacy">revenuecat.com/privacy</a>',
    ],
    third: ['本アプリが直接収集した個人情報を第三者に提供することはありません。', 'ただし、以下のサービスの利用時に当該事業者へデータが渡る場合があります。'],
    thirdList: ['サブスクリプション: 購入履歴および匿名識別子をアプリストア（Google/Apple）とRevenueCat, Inc.へ提供（アプリ内課金参照）', '音声出力: 発音はアプリに同梱した事前生成音源とOS内蔵の音声エンジンを使用し、外部送信はありません'],
    intl: ['本アプリは全世界に提供されるため、一部のデータが利用者の国外のサーバーで処理される場合があります。', 'RevenueCat, Inc.（米国） — 購読管理のための購入履歴および端末/識別子データ', 'Apple Inc. / Google LLC — 決済および購読処理'],
    retain: ['本アプリが保存するすべての学習データ（進度・復習キュー・プロフィール名・設定）は利用者の端末にのみ保存され、アプリ削除時に直ちに破棄されます。', '購入関連データの保有はアプリストアおよびRevenueCatのポリシーに従います。'],
    rights: ['利用者はいつでも保存データを削除できます。'],
    rightsList: ['学習記録: アプリ内設定 → データ初期化', '端末内の全データ: 端末からアプリを削除', '購入データ: 下記へ連絡し、RevenueCatが保有するデータの削除を請求'],
    rightsTail: '端末を変更した場合は、決済画面の「購入を復元」で購読を引き継げます。',
    contact: '個人情報に関するお問い合わせは以下までご連絡ください。',
    contactList: [`運営者: ${OPERATOR}`, `メール: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ 最小限の収集',
    info: '本アプリは会員登録・ログインがなく、アプリ自体は個人を識別する情報を収集しません。学習データは端末に保存されます。データはアプリ内課金の処理（アプリストア・RevenueCat）のためにのみ外部で処理されます。',
    footerTerms: '利用規約',
  },
  zh: {
    intro: 'BaeuGO（以下称"本应用"）以下列目的运营。',
    purpose: ['提供韩语单词、语法及 TOPIK 考试备考内容', '学习进度与间隔重复（复习）管理', '发送学习提醒通知', '处理应用内订阅（배우GO Plus）'],
    collectIntro: '本应用无需注册或登录即可使用，且不收集可识别个人身份的信息。学习数据仅保存在您的设备上。以下项目仅在使用部分功能时适用。',
    items: [
      ['🔔', '通知', '用于发送学习提醒。可在设备设置中关闭。'],
      ['📱', '设备本地存储', '学习进度、复习队列、个人昵称与设置仅保存在设备本地，不会外传。'],
      ['💳', '购买信息', '订阅 Plus 时，购买数据会通过应用商店与 RevenueCat 处理。请参阅下方说明。'],
    ],
    iapHead: '应用内购买（배우GO Plus）',
    iap: [
      '订阅通过 Google Play 或 Apple App Store，以及订阅管理提供方 RevenueCat, Inc.（美国）处理。',
      '为订阅管理、收据验证与防欺诈，RevenueCat 会处理购买记录、由其生成的匿名应用用户标识符、设备与操作系统信息，以及基于 IP 的国家/地区信息。无需登录，这些数据不与您的真实身份关联。',
      '运营者不设自有服务器，也不另行存储您的数据。',
      'RevenueCat 隐私政策: <a href="https://www.revenuecat.com/privacy">revenuecat.com/privacy</a>',
    ],
    third: ['本应用不会将其直接收集的个人信息提供给第三方。', '但在使用以下服务时，数据可能被传输给相应运营方：'],
    thirdList: ['订阅：向应用商店（Google/Apple）与 RevenueCat, Inc. 提供购买记录及匿名标识符（见应用内购买）', '语音输出：发音使用应用内置的预生成音频与系统语音引擎，无外部传输'],
    intl: ['由于本应用面向全球提供，部分数据可能在您所在国家以外的服务器上处理：', 'RevenueCat, Inc.（美国）— 用于订阅管理的购买记录及设备/标识符数据', 'Apple Inc. / Google LLC — 支付与订阅处理'],
    retain: ['本应用保存的所有学习数据（进度、复习队列、个人昵称、设置）仅存储于您的设备，删除应用时立即销毁。', '购买相关数据的保留遵循应用商店与 RevenueCat 的政策。'],
    rights: ['您可随时删除已保存的数据。'],
    rightsList: ['学习记录：应用设置 → 重置数据', '设备内全部数据：从设备卸载应用', '购买数据：通过下方联系我们，请求删除 RevenueCat 持有的数据'],
    rightsTail: '更换设备时，可在付费页使用"恢复购买"迁移订阅。',
    contact: '如有个人信息相关问题，请通过以下方式联系我们。',
    contactList: [`运营者：${OPERATOR}`, `邮箱：<a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ 最小化收集',
    info: '本应用无注册与登录，应用本身不收集可识别个人身份的信息。学习数据保存在您的设备上。仅为处理应用内订阅（应用商店与 RevenueCat）才会在外部处理数据。',
    footerTerms: '服务条款',
  },
  vi: {
    intro: 'BaeuGO (sau đây gọi là "Ứng dụng") được vận hành với các mục đích sau.',
    purpose: ['Cung cấp nội dung từ vựng, ngữ pháp tiếng Hàn và luyện thi TOPIK', 'Quản lý tiến độ học và ôn tập theo khoảng cách', 'Gửi thông báo nhắc học', 'Xử lý gói đăng ký trong ứng dụng (배우GO Plus)'],
    collectIntro: 'Ứng dụng hoạt động mà không cần đăng ký hay đăng nhập và không thu thập thông tin nhận dạng cá nhân. Dữ liệu học tập chỉ được lưu trên thiết bị của bạn. Các mục dưới đây chỉ áp dụng khi bạn dùng một số tính năng.',
    items: [
      ['🔔', 'Thông báo', 'Dùng để gửi nhắc học. Bạn có thể tắt trong cài đặt thiết bị.'],
      ['📱', 'Bộ nhớ trên thiết bị', 'Tiến độ học, hàng đợi ôn tập, tên hồ sơ và cài đặt chỉ được lưu trên thiết bị và không được truyền đi.'],
      ['💳', 'Thông tin mua hàng', 'Khi bạn đăng ký Plus, dữ liệu mua hàng được xử lý qua cửa hàng ứng dụng và RevenueCat. Xem mục bên dưới.'],
    ],
    iapHead: 'Mua trong ứng dụng (배우GO Plus)',
    iap: [
      'Gói đăng ký được xử lý qua Google Play hoặc Apple App Store cùng RevenueCat, Inc. (Hoa Kỳ), nhà cung cấp quản lý đăng ký của chúng tôi.',
      'Để quản lý đăng ký, xác thực biên nhận và chống gian lận, RevenueCat xử lý lịch sử mua hàng, một mã người dùng ẩn danh do RevenueCat tạo, thông tin thiết bị và hệ điều hành, và quốc gia suy ra từ IP. Không cần đăng nhập và dữ liệu này không liên kết với danh tính thực của bạn.',
      'Nhà vận hành không có máy chủ riêng và không lưu trữ riêng dữ liệu của bạn.',
      'Chính sách quyền riêng tư của RevenueCat: <a href="https://www.revenuecat.com/privacy">revenuecat.com/privacy</a>',
    ],
    third: ['Chúng tôi không cung cấp cho bên thứ ba những thông tin mà chúng tôi trực tiếp thu thập.', 'Tuy nhiên, dữ liệu có thể được chuyển cho các nhà cung cấp sau khi bạn sử dụng dịch vụ của họ:'],
    thirdList: ['Đăng ký: lịch sử mua hàng và mã ẩn danh cho các cửa hàng ứng dụng (Google/Apple) và RevenueCat, Inc. (xem Mua trong ứng dụng)', 'Đầu ra giọng nói: phát âm dùng âm thanh dựng sẵn kèm trong Ứng dụng và công cụ giọng nói của hệ điều hành, không truyền ra bên ngoài'],
    intl: ['Vì Ứng dụng được cung cấp trên toàn cầu, một số dữ liệu có thể được xử lý trên máy chủ đặt ngoài quốc gia của bạn:', 'RevenueCat, Inc. (Hoa Kỳ) — lịch sử mua hàng và dữ liệu thiết bị/mã nhận dạng để quản lý đăng ký', 'Apple Inc. / Google LLC — xử lý thanh toán và đăng ký'],
    retain: ['Toàn bộ dữ liệu học tập mà Ứng dụng lưu (tiến độ, hàng đợi ôn tập, tên hồ sơ, cài đặt) chỉ được giữ trên thiết bị của bạn và bị hủy ngay khi gỡ Ứng dụng.', 'Việc lưu giữ dữ liệu liên quan đến mua hàng tuân theo chính sách của các cửa hàng ứng dụng và RevenueCat.'],
    rights: ['Bạn có thể xóa dữ liệu đã lưu bất cứ lúc nào.'],
    rightsList: ['Hồ sơ học tập: Cài đặt Ứng dụng → Đặt lại dữ liệu', 'Toàn bộ dữ liệu trên thiết bị: gỡ Ứng dụng khỏi thiết bị', 'Dữ liệu mua hàng: liên hệ với chúng tôi bên dưới để yêu cầu xóa dữ liệu do RevenueCat lưu giữ'],
    rightsTail: 'Khi đổi thiết bị, dùng "Khôi phục giao dịch" trên trang thanh toán để chuyển gói đăng ký.',
    contact: 'Nếu có thắc mắc về quyền riêng tư, vui lòng liên hệ với chúng tôi bên dưới.',
    contactList: [`Nhà vận hành: ${OPERATOR}`, `Email: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ Thu thập tối thiểu',
    info: 'Ứng dụng không có đăng ký hay đăng nhập và bản thân Ứng dụng không thu thập thông tin nhận dạng cá nhân. Dữ liệu học tập được lưu trên thiết bị. Dữ liệu chỉ được xử lý bên ngoài để xử lý gói đăng ký trong ứng dụng (cửa hàng ứng dụng và RevenueCat).',
    footerTerms: 'Điều khoản dịch vụ',
  },
};

// ─────────────────────────── 이용약관 본문
const TERMS = {
  en: {
    s1h: 'Article 1 (Purpose)', s1: `These Terms govern the conditions and procedures for using the mobile application "BaeuGO" (the "App") provided by ${OPERATOR} (the "Operator"), and the rights, obligations, and responsibilities between the Operator and the user.`,
    s2h: 'Article 2 (Services)', s2: 'The App provides the following services.',
    s2list: ['Korean vocabulary, grammar, and TOPIK exam-prep content', 'Writing practice with model answers and self-scoring (쓰GO)', 'Mock tests and weakness analysis', 'Premium features via in-app purchase (Plus)'],
    s3h: 'Article 3 (User Obligations)', s3: 'The user must not do the following.',
    s3list: ['Reproduce, redistribute, or commercially use the learning content without permission', 'Attempt to reverse-engineer, decompile, or extract the source of the App', 'Interfere with the normal operation of the App or infringe the Operator\'s rights'],
    s4h: '⚠️ Article 4 (Limitation of Liability)',
    s4: [
      '① The learning content is reference material to support Korean learning and does not guarantee exam success or any specific learning outcome.',
      '② The content may contain some errors; please give priority to official exam (TOPIK, etc.) materials. The Operator is not liable for damages arising from content errors.',
      '③ The model answers and self-scoring in the 쓰GO writing feature are study aids, not an official grade or evaluation.',
      '④ The Operator is not liable for damages caused by force majeure, communication failures, or outages of third-party services (Google, Apple, RevenueCat, etc.).',
    ],
    s5h: 'Article 5 (Content and Copyright)', s5: 'All exam questions in the App are original works created by the Operator following only the official format; they are not official past exam papers. The content may not be reproduced or redistributed without permission.',
    s6h: 'Article 6 (Payment and Refunds)', s6: 'Paid purchases are made through the in-app purchase system of Google Play or the Apple App Store, and refunds follow each store\'s refund policy. The Operator does not provide direct refunds outside the stores.',
    s7h: 'Article 7 (Changes and Termination)', s7: 'The Operator may change features or discontinue the service after prior notice. For essential changes to features provided through paid purchase, the Operator will consider reasonable compensation or refund.',
    s8h: 'Article 8 (Dispute Resolution)', s8: 'Any dispute between the Operator and the user shall be resolved through good-faith consultation; where consultation is not possible, the competent court under the Civil Procedure Act of the Republic of Korea shall have jurisdiction.',
    s9h: 'Article 9 (Contact)', s9list: [`Operator: ${OPERATOR}`, `Email: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    footerPrivacy: 'Privacy Policy',
  },
  ko: {
    s1h: '제1조 (목적)', s1: `본 약관은 ${OPERATOR}(이하 "운영자")이 제공하는 모바일 애플리케이션 "배우GO"(이하 "앱")의 이용 조건과 절차, 운영자와 이용자 간의 권리·의무 및 책임 사항을 규정합니다.`,
    s2h: '제2조 (서비스 내용)', s2: '앱은 다음 서비스를 제공합니다.',
    s2list: ['한국어 단어·문법·TOPIK 시험 준비 콘텐츠 제공', '모범답안과 자가 채점을 제공하는 쓰기 연습(쓰GO)', '모의고사 및 약점 분석', '인앱 결제(Plus)를 통한 프리미엄 기능 제공'],
    s3h: '제3조 (이용자의 의무)', s3: '이용자는 다음 행위를 해서는 안 됩니다.',
    s3list: ['앱의 학습 콘텐츠를 무단으로 복제·재배포·상업적 이용', '앱을 역공학·디컴파일·소스 추출 시도', '앱의 정상 동작을 방해하거나 운영자의 권리를 침해하는 행위'],
    s4h: '⚠️ 제4조 (운영자의 책임 제한)',
    s4: [
      '① 앱이 제공하는 학습 콘텐츠는 한국어 학습 보조를 위한 참고 자료이며, 시험 합격이나 특정 학습 성과를 보장하지 않습니다.',
      '② 학습 콘텐츠에 일부 오류가 포함될 수 있으며, 공식 시험(TOPIK 등) 자료를 우선시하시기 바랍니다. 운영자는 콘텐츠 오류로 발생한 손해에 대해 책임지지 않습니다.',
      '③ 쓰GO 쓰기 기능의 모범답안과 자가 채점은 학습 보조 수단이며, 공식 채점이나 평가가 아닙니다.',
      '④ 천재지변, 통신장애, 제3자 서비스(Google·Apple·RevenueCat 등) 장애로 발생한 손해에 대해 운영자는 책임지지 않습니다.',
    ],
    s5h: '제5조 (콘텐츠 및 저작권)', s5: '앱의 모든 시험 문항은 공식 형식만을 따라 운영자가 자체 제작한 창작물이며, 공식 기출문제가 아닙니다. 콘텐츠는 무단으로 복제·재배포할 수 없습니다.',
    s6h: '제6조 (유료 결제 및 환불)', s6: '유료 결제는 Google Play 또는 Apple App Store의 인앱 결제 시스템을 통해 이루어지며, 환불은 각 스토어의 환불 정책을 따릅니다. 운영자는 스토어를 통하지 않은 직접 환불을 제공하지 않습니다.',
    s7h: '제7조 (서비스 변경 및 종료)', s7: '운영자는 사전 고지 후 앱의 기능을 변경하거나 서비스를 종료할 수 있습니다. 다만 유료 결제로 제공되는 기능의 본질적 변경 시에는 합리적 범위 내에서 보상 또는 환불을 고려합니다.',
    s8h: '제8조 (분쟁 해결)', s8: '본 약관과 관련하여 운영자와 이용자 간에 분쟁이 발생한 경우 양자는 성실히 협의하여 해결하며, 협의가 불가능한 경우 대한민국 민사소송법에 따른 관할 법원에 따릅니다.',
    s9h: '제9조 (문의)', s9list: [`운영자: ${OPERATOR}`, `이메일: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    footerPrivacy: '개인정보처리방침',
  },
  ja: {
    s1h: '第1条（目的）', s1: `本規約は、${OPERATOR}（以下「運営者」）が提供するモバイルアプリケーション「BaeuGO」（以下「本アプリ」）の利用条件および手続き、運営者と利用者間の権利・義務および責任事項を定めます。`,
    s2h: '第2条（サービス内容）', s2: '本アプリは次のサービスを提供します。',
    s2list: ['韓国語の単語・文法・TOPIK試験対策コンテンツの提供', '模範解答と自己採点を提供する作文練習（쓰GO）', '模擬試験および弱点分析', 'アプリ内課金（Plus）によるプレミアム機能の提供'],
    s3h: '第3条（利用者の義務）', s3: '利用者は次の行為をしてはなりません。',
    s3list: ['本アプリの学習コンテンツを無断で複製・再配布・商業利用すること', '本アプリのリバースエンジニアリング・逆コンパイル・ソース抽出を試みること', '本アプリの正常な動作を妨げ、または運営者の権利を侵害する行為'],
    s4h: '⚠️ 第4条（運営者の責任制限）',
    s4: [
      '① 本アプリが提供する学習コンテンツは韓国語学習補助のための参考資料であり、試験合格や特定の学習成果を保証しません。',
      '② 学習コンテンツには一部の誤りが含まれる場合があり、公式試験（TOPIK等）の資料を優先してください。運営者はコンテンツの誤りにより生じた損害について責任を負いません。',
      '③ 쓰GO作文機能の模範解答と自己採点は学習補助手段であり、公式な採点や評価ではありません。',
      '④ 天災地変、通信障害、第三者サービス（Google・Apple・RevenueCat等）の障害により生じた損害について、運営者は責任を負いません。',
    ],
    s5h: '第5条（コンテンツおよび著作権）', s5: '本アプリのすべての試験問題は、公式の形式のみに従って運営者が自作した創作物であり、公式の過去問ではありません。コンテンツを無断で複製・再配布することはできません。',
    s6h: '第6条（有料課金および返金）', s6: '有料課金はGoogle PlayまたはApple App Storeのアプリ内課金システムを通じて行われ、返金は各ストアの返金ポリシーに従います。運営者はストアを通さない直接返金を提供しません。',
    s7h: '第7条（サービスの変更および終了）', s7: '運営者は事前告知の上、本アプリの機能を変更またはサービスを終了できます。ただし有料課金で提供される機能の本質的な変更時には、合理的な範囲で補償または返金を検討します。',
    s8h: '第8条（紛争解決）', s8: '本規約に関して運営者と利用者の間に紛争が生じた場合、両者は誠実に協議して解決し、協議が不可能な場合は大韓民国民事訴訟法による管轄裁判所に従います。',
    s9h: '第9条（お問い合わせ）', s9list: [`運営者: ${OPERATOR}`, `メール: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    footerPrivacy: 'プライバシーポリシー',
  },
  zh: {
    s1h: '第1条（目的）', s1: `本条款规定 ${OPERATOR}（以下称"运营者"）提供的移动应用"BaeuGO"（以下称"本应用"）的使用条件与流程，以及运营者与用户之间的权利、义务和责任事项。`,
    s2h: '第2条（服务内容）', s2: '本应用提供以下服务。',
    s2list: ['提供韩语单词、语法及 TOPIK 考试备考内容', '提供范文与自我评分的写作练习（쓰GO）', '模拟考试及弱点分析', '通过应用内购买（Plus）提供高级功能'],
    s3h: '第3条（用户义务）', s3: '用户不得进行以下行为。',
    s3list: ['未经许可复制、再分发或商业使用本应用的学习内容', '尝试对本应用进行逆向工程、反编译或提取源代码', '妨碍本应用正常运行或侵犯运营者权利的行为'],
    s4h: '⚠️ 第4条（运营者的责任限制）',
    s4: [
      '① 本应用提供的学习内容为辅助韩语学习的参考资料，不保证考试合格或任何特定学习成果。',
      '② 学习内容可能包含部分错误，请以官方考试（TOPIK 等）资料为准。运营者对因内容错误产生的损害不承担责任。',
      '③ 쓰GO 写作功能的范文与自我评分是学习辅助手段，并非官方评分或评价。',
      '④ 对于因不可抗力、通信故障或第三方服务（Google、Apple、RevenueCat 等）故障造成的损害，运营者不承担责任。',
    ],
    s5h: '第5条（内容与著作权）', s5: '本应用的所有试题均为运营者仅依照官方格式自行创作的作品，并非官方历年真题。未经许可不得复制或再分发相关内容。',
    s6h: '第6条（付费与退款）', s6: '付费购买通过 Google Play 或 Apple App Store 的应用内购买系统进行，退款遵循各商店的退款政策。运营者不提供绕过商店的直接退款。',
    s7h: '第7条（服务变更与终止）', s7: '运营者可在事先通知后变更应用功能或终止服务。但对付费购买所提供功能进行实质性变更时，将在合理范围内考虑补偿或退款。',
    s8h: '第8条（争议解决）', s8: '就本条款，运营者与用户之间发生争议时，双方应本着诚信协商解决；无法协商时，以大韩民国民事诉讼法规定的管辖法院为准。',
    s9h: '第9条（联系方式）', s9list: [`运营者：${OPERATOR}`, `邮箱：<a href="mailto:${EMAIL}">${EMAIL}</a>`],
    footerPrivacy: '隐私政策',
  },
  vi: {
    s1h: 'Điều 1 (Mục đích)', s1: `Điều khoản này quy định điều kiện và quy trình sử dụng ứng dụng di động "BaeuGO" (sau đây gọi là "Ứng dụng") do ${OPERATOR} (sau đây gọi là "Nhà vận hành") cung cấp, cùng các quyền, nghĩa vụ và trách nhiệm giữa Nhà vận hành và người dùng.`,
    s2h: 'Điều 2 (Dịch vụ)', s2: 'Ứng dụng cung cấp các dịch vụ sau.',
    s2list: ['Nội dung từ vựng, ngữ pháp tiếng Hàn và luyện thi TOPIK', 'Luyện viết kèm bài mẫu và tự chấm điểm (쓰GO)', 'Thi thử và phân tích điểm yếu', 'Tính năng cao cấp qua mua trong ứng dụng (Plus)'],
    s3h: 'Điều 3 (Nghĩa vụ của người dùng)', s3: 'Người dùng không được thực hiện các hành vi sau.',
    s3list: ['Sao chép, phân phối lại hoặc sử dụng thương mại nội dung học tập mà không được phép', 'Cố gắng dịch ngược, phân rã hoặc trích xuất mã nguồn của Ứng dụng', 'Cản trở hoạt động bình thường của Ứng dụng hoặc xâm phạm quyền của Nhà vận hành'],
    s4h: '⚠️ Điều 4 (Giới hạn trách nhiệm)',
    s4: [
      '① Nội dung học tập là tài liệu tham khảo hỗ trợ học tiếng Hàn và không bảo đảm việc thi đỗ hay bất kỳ kết quả học tập cụ thể nào.',
      '② Nội dung có thể chứa một số lỗi; vui lòng ưu tiên tài liệu thi chính thức (TOPIK, v.v.). Nhà vận hành không chịu trách nhiệm về thiệt hại phát sinh từ lỗi nội dung.',
      '③ Bài mẫu và tự chấm điểm trong tính năng viết 쓰GO là công cụ hỗ trợ học tập, không phải điểm số hay đánh giá chính thức.',
      '④ Nhà vận hành không chịu trách nhiệm về thiệt hại do bất khả kháng, sự cố liên lạc hoặc sự cố của dịch vụ bên thứ ba (Google, Apple, RevenueCat, v.v.).',
    ],
    s5h: 'Điều 5 (Nội dung và bản quyền)', s5: 'Mọi câu hỏi thi trong Ứng dụng là tác phẩm nguyên gốc do Nhà vận hành tạo ra chỉ theo định dạng chính thức; đây không phải đề thi thật của các kỳ thi trước. Không được sao chép hay phân phối lại nội dung khi chưa được phép.',
    s6h: 'Điều 6 (Thanh toán và hoàn tiền)', s6: 'Việc mua trả phí được thực hiện qua hệ thống mua trong ứng dụng của Google Play hoặc Apple App Store, và việc hoàn tiền tuân theo chính sách của từng cửa hàng. Nhà vận hành không hoàn tiền trực tiếp bên ngoài cửa hàng.',
    s7h: 'Điều 7 (Thay đổi và chấm dứt dịch vụ)', s7: 'Nhà vận hành có thể thay đổi tính năng hoặc ngừng dịch vụ sau khi thông báo trước. Tuy nhiên, đối với những thay đổi thiết yếu về tính năng được cung cấp qua mua trả phí, Nhà vận hành sẽ cân nhắc bồi thường hoặc hoàn tiền trong phạm vi hợp lý.',
    s8h: 'Điều 8 (Giải quyết tranh chấp)', s8: 'Mọi tranh chấp giữa Nhà vận hành và người dùng sẽ được giải quyết thông qua thương lượng thiện chí; nếu không thể thương lượng, tòa án có thẩm quyền theo Luật Tố tụng Dân sự của Hàn Quốc sẽ có thẩm quyền.',
    s9h: 'Điều 9 (Liên hệ)', s9list: [`Nhà vận hành: ${OPERATOR}`, `Email: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    footerPrivacy: 'Chính sách quyền riêng tư',
  },
};

// ─────────────────────────── HTML 조립 헬퍼
const articleFmt = {
  en: (n) => `Article ${n}`, ko: (n) => `제${n}조`, ja: (n) => `第${n}条`, zh: (n) => `第${n}条`, vi: (n) => `Điều ${n}`,
};
// 개인정보처리방침 8개 섹션 이름 (조 번호는 articleFmt로 붙인다)
const PRIV_NAMES = {
  en: ['Purpose of Processing', 'Items Collected', 'In-App Purchases', 'Provision to Third Parties', 'International Transfer', 'Retention and Use Period', 'Your Rights', 'Privacy Officer'],
  ko: ['개인정보의 처리 목적', '수집하는 항목', '인앱 구독', '개인정보의 제3자 제공', '개인정보의 국외 이전', '개인정보의 보유 및 이용기간', '이용자의 권리', '개인정보 보호책임자'],
  ja: ['個人情報の処理目的', '収集する項目', 'アプリ内課金', '第三者提供', '国外移転', '保有および利用期間', '利用者の権利', '個人情報保護責任者'],
  zh: ['处理目的', '收集的项目', '应用内购买', '向第三方提供', '跨境传输', '保留与使用期限', '用户权利', '个人信息保护负责人'],
  vi: ['Mục đích xử lý', 'Các mục thu thập', 'Mua trong ứng dụng', 'Cung cấp cho bên thứ ba', 'Chuyển ra nước ngoài', 'Thời gian lưu giữ và sử dụng', 'Quyền của người dùng', 'Người phụ trách BV thông tin cá nhân'],
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
  <title>${title} - 배우GO</title>
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
  const eff = `${T.effectiveWord[lang]}: ${EFFECTIVE[lang]} · ${T.appWord[lang]}: 배우GO (BaeuGO)`;
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
    card(ph(lang, 3), paras(p.iap)),
    card(ph(lang, 4), paras(p.third) + '\n' + ul(p.thirdList)),
    card(ph(lang, 5), `      <p>${p.intl[0]}</p>\n` + ul(p.intl.slice(1))),
    card(ph(lang, 6), paras(p.retain)),
    card(ph(lang, 7), `      <p>${p.rights[0]}</p>\n${ul(p.rightsList)}\n      <p>${p.rightsTail}</p>`),
    card(ph(lang, 8), `      <p>${p.contact}</p>\n${ul(p.contactList)}`),
    card(p.infoHead, `      <p>${p.info}</p>`, 'card info-card'),
  ].join('\n\n');
  const footer = `© 2026 ${OPERATOR} · <a href="${file('terms', lang)}">${p.footerTerms}</a>`;
  return page(lang, 'privacy', T.privacyTitle[lang], eff, cards, footer);
}

function buildTerms(lang) {
  const t = TERMS[lang];
  const eff = `${T.effectiveWord[lang]}: ${EFFECTIVE[lang]} · ${T.appWord[lang]}: 배우GO (BaeuGO)`;
  const cards = [
    card(t.s1h, `      <p>${t.s1}</p>`),
    card(t.s2h, `      <p>${t.s2}</p>\n${ul(t.s2list)}`),
    card(t.s3h, `      <p>${t.s3}</p>\n${ul(t.s3list)}`),
    card(t.s4h, paras(t.s4), 'card warning-card'),
    card(t.s5h, `      <p>${t.s5}</p>`),
    card(t.s6h, `      <p>${t.s6}</p>`),
    card(t.s7h, `      <p>${t.s7}</p>`),
    card(t.s8h, `      <p>${t.s8}</p>`),
    card(t.s9h, ul(t.s9list)),
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
  <title>배우GO (BaeuGO) - ${T.privacyTitle[lang]} · ${T.termsTitle[lang]}</title>
  <link rel="stylesheet" href="../style.css" />
</head>
<body>
  <main class="container">
    <a class="back-link" href="../">${T.backToList[lang]}</a>
    <h1>배우GO (BaeuGO)</h1>
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
