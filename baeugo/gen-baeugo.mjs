// 배우GO 법적 문서 생성기 — 5개 언어(en/ko/ja/zh/vi) × (개인정보처리방침·이용약관·랜딩)
// 언어 간 구조를 한 소스에서 통일한다. 실행: node gen-baeugo.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const EFFECTIVE = { en: 'July 22, 2026', ko: '2026년 07월 22일', ja: '2026年07月22日', zh: '2026年07月22日', vi: 'Ngày 22 tháng 7, 2026' };
const OPERATOR = '매듭연구소'; // 기존 저장소 표기 유지
const STUDIO = '스튜디오 노트랩 (Studio Knotlab)';
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
    purpose: ['Providing Korean vocabulary, grammar, and TOPIK exam-prep content', 'AI writing feedback for the writing practice feature (쓰GO)', 'Learning progress and spaced-repetition review management', 'Study reminder notifications', 'Advertising services (Google AdMob)'],
    collectIntro: 'The App works without sign-up or login and does not collect personally identifying information. However, the following items may be used when you use certain features.',
    items: [
      ['🔔', 'Notifications', 'Used to send study reminders. You can turn them off in your device settings.'],
      ['📱', 'On-device storage', 'Learning progress, review queue, and settings are stored only on your device.'],
      ['✍️', 'Text you write (쓰GO)', 'Korean sentences you write for AI feedback are sent to an external AI service. See the section below.'],
      ['📢', 'Advertising ID (IDFA/GAID)', 'May be collected by Google AdMob for ad personalization. On iOS this occurs only after App Tracking Transparency (ATT) consent.'],
    ],
    writingHead: '쓰GO AI Writing Feedback (External Transmission)',
    writing: [
      'When you use the 쓰GO writing feature, the Korean text you write is sent to Anthropic PBC (United States) through the Claude API to generate feedback and a model answer.',
      'The transmitted text is used only to produce your feedback. We operate no server of our own and do not separately store your writing.',
      'The processing of transmitted data follows Anthropic\'s policy. Please avoid entering personal or sensitive information into the writing box.',
      'Anthropic Privacy Policy: <a href="https://www.anthropic.com/legal/privacy">anthropic.com/legal/privacy</a>',
    ],
    adsHead: 'Advertising Services',
    ads: [
      'The App may serve ads through Google AdMob. AdMob may collect and use an advertising identifier (IDFA/GAID), device information, and IP address for ad delivery and personalization.',
      'iOS: an App Tracking Transparency (ATT) prompt appears on launch. If you decline, only non-personalized ads are shown.',
      'Android: you can reset your advertising ID or opt out of ad personalization in Settings → Google → Ads.',
    ],
    googlePolicy: 'Google Privacy Policy: <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>',
    thirdHead: 'Provision to Third Parties',
    third: ['We do not provide information we directly collect to third parties.', 'However, data may be transferred to the following operators when you use their services:'],
    thirdList: ['Advertising: advertising identifier and device information to Google AdMob (see Advertising Services)', 'Writing feedback: the text you write to Anthropic PBC (see 쓰GO section)', 'Voice output: on-device OS speech engine is used for pronunciation; no external transmission'],
    intlHead: 'International Transfer',
    intl: ['Because the App is offered worldwide, some data is processed on servers located outside your country:', 'Anthropic PBC (United States) — text you submit to 쓰GO', 'Google LLC — advertising and related device data'],
    retainHead: 'Retention and Use Period',
    retain: ['All learning data the App stores (progress, review queue, etc.) is kept only on your device and is destroyed immediately when the App is deleted.', 'Retention of advertising-identifier data follows Google\'s policy. Text sent to 쓰GO follows Anthropic\'s policy.'],
    rightsHead: 'Your Rights',
    rights: ['You can delete stored data at any time in the App settings.'],
    rightsList: ['Learning records: App settings → Reset data', 'All data: delete the App from your device'],
    rightsTail: 'You can opt out of ad tracking in iOS Settings → Privacy → Tracking, or Android Settings → Google → Ads.',
    contactHead: 'Privacy Officer',
    contact: 'For privacy inquiries, please contact us below.',
    contactList: [`Operator: ${OPERATOR}`, `Email: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ Data Minimization',
    info: 'The App has no sign-up or login and does not itself collect personally identifying information. Text is transmitted externally only when you use 쓰GO, and advertising identifiers are collected by Google AdMob (on iOS, only after your consent).',
    footerTerms: 'Terms of Service',
  },
  ko: {
    intro: '배우GO(이하 "앱")는 다음의 목적으로 앱을 운영합니다.',
    purpose: ['한국어 단어·문법·TOPIK 시험 준비 콘텐츠 제공', '쓰기 연습 기능(쓰GO)의 AI 첨삭 제공', '학습 진도 및 간격 반복 복습 관리', '학습 복습 알림 발송', '광고 서비스 제공 (Google AdMob)'],
    collectIntro: '앱 자체는 회원가입·로그인 없이 동작하며, 개인 식별 정보를 수집하지 않습니다. 단, 일부 기능 사용 시 아래 항목이 사용될 수 있습니다.',
    items: [
      ['🔔', '알림', '학습 복습 리마인더 발송에 사용됩니다. 기기 설정에서 수신을 끌 수 있습니다.'],
      ['📱', '기기 내 저장소', '학습 진도·복습 큐·설정을 기기 로컬에만 저장합니다.'],
      ['✍️', '작성한 문장 (쓰GO)', 'AI 첨삭을 위해 작성한 한국어 문장이 외부 AI 서비스로 전송됩니다. 아래 항목을 참고하세요.'],
      ['📢', '광고 식별자 (IDFA/GAID)', 'Google AdMob이 광고 개인화 목적으로 수집할 수 있습니다. iOS에서는 앱 추적 투명성(ATT) 동의 후 수집됩니다.'],
    ],
    writingHead: '쓰GO AI 첨삭 (외부 전송)',
    writing: [
      '쓰GO 쓰기 기능 사용 시, 작성한 한국어 문장이 첨삭과 모범답안 생성을 위해 Claude API를 통해 Anthropic PBC(미국)로 전송됩니다.',
      '전송된 문장은 첨삭 결과 생성에만 사용됩니다. 운영자는 자체 서버를 두지 않으며 작성 내용을 별도로 저장하지 않습니다.',
      '전송된 데이터의 처리는 Anthropic의 정책을 따릅니다. 쓰기 입력란에 개인정보나 민감정보를 입력하지 마시기 바랍니다.',
      'Anthropic 개인정보처리방침: <a href="https://www.anthropic.com/legal/privacy">anthropic.com/legal/privacy</a>',
    ],
    adsHead: '광고 서비스',
    ads: [
      '본 앱은 Google AdMob을 통해 광고를 제공할 수 있습니다. AdMob은 광고 게재 및 개인화 목적으로 광고 식별자(IDFA/GAID), 기기 정보, IP 주소 등을 수집·활용할 수 있습니다.',
      'iOS: 앱 실행 시 앱 추적 투명성(ATT) 동의 팝업이 표시됩니다. 동의하지 않으면 비개인화 광고가 표시됩니다.',
      'Android: 기기 설정 → Google → 광고에서 광고 ID 재설정 또는 광고 맞춤 설정을 해제할 수 있습니다.',
    ],
    googlePolicy: 'Google의 개인정보처리방침: <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>',
    thirdHead: '개인정보의 제3자 제공',
    third: ['앱이 직접 수집한 개인정보는 제3자에게 제공하지 않습니다.', '단, 아래 서비스 이용 시 해당 사업자에게 데이터가 전달될 수 있습니다.'],
    thirdList: ['광고: Google AdMob에 광고 식별자 및 기기 정보 전달 (광고 서비스 참고)', '쓰기 첨삭: 작성한 문장을 Anthropic PBC에 전달 (쓰GO 항목 참고)', '음성 출력: 발음 재생에 OS 내장 음성 엔진을 사용하며 별도 외부 전송은 없습니다'],
    intlHead: '개인정보의 국외 이전',
    intl: ['본 앱은 전 세계에 제공되므로 일부 데이터가 이용자 국가 밖의 서버에서 처리될 수 있습니다.', 'Anthropic PBC(미국) — 쓰GO에 입력한 문장', 'Google LLC — 광고 및 관련 기기 데이터'],
    retainHead: '개인정보의 보유 및 이용기간',
    retain: ['본 앱이 저장하는 모든 학습 데이터(진도·복습 큐 등)는 이용자의 기기에만 저장되며, 앱 삭제 시 즉시 파기됩니다.', '광고 식별자 관련 데이터의 보유기간은 Google의 정책을, 쓰GO 전송 문장은 Anthropic의 정책을 따릅니다.'],
    rightsHead: '이용자의 권리',
    rights: ['이용자는 앱 내 설정에서 저장된 데이터를 언제든지 삭제할 수 있습니다.'],
    rightsList: ['학습 기록: 앱 내 설정 → 데이터 초기화', '전체 데이터: 기기에서 앱 삭제'],
    rightsTail: '광고 추적 거부는 iOS 설정 → 개인정보 보호 → 추적, Android 설정 → Google → 광고에서 변경할 수 있습니다.',
    contactHead: '개인정보 보호책임자',
    contact: '개인정보 관련 문의 사항이 있으시면 아래로 연락해주세요.',
    contactList: [`운영자: ${OPERATOR}`, `이메일: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ 최소 수집 원칙',
    info: '본 앱은 회원가입·로그인이 없으며 앱 자체는 개인 식별 정보를 수집하지 않습니다. 문장은 쓰GO 사용 시에만 외부로 전송되며, 광고 식별자는 Google AdMob에 의해 수집됩니다(iOS에서는 사용자 동의 후).',
    footerTerms: '이용약관',
  },
  ja: {
    intro: 'BaeuGO（以下「本アプリ」）は、次の目的でアプリを運営します。',
    purpose: ['韓国語の単語・文法・TOPIK試験対策コンテンツの提供', '作文練習機能（쓰GO）のAI添削の提供', '学習進度および間隔反復（復習）の管理', '学習リマインダー通知の送信', '広告サービスの提供（Google AdMob）'],
    collectIntro: '本アプリは会員登録・ログインなしで動作し、個人を識別する情報を収集しません。ただし、一部機能の利用時に以下の項目が使用される場合があります。',
    items: [
      ['🔔', '通知', '学習リマインダーの送信に使用されます。端末の設定でオフにできます。'],
      ['📱', '端末内ストレージ', '学習進度・復習キュー・設定を端末ローカルにのみ保存します。'],
      ['✍️', '入力した文章（쓰GO）', 'AI添削のために入力した韓国語の文章は外部AIサービスへ送信されます。以下の項目をご覧ください。'],
      ['📢', '広告識別子（IDFA/GAID）', 'Google AdMobが広告のパーソナライズ目的で収集する場合があります。iOSではATT（アプリのトラッキング透明性）同意後に収集されます。'],
    ],
    writingHead: '쓰GO AI添削（外部送信）',
    writing: [
      '쓰GO作文機能の利用時、入力した韓国語の文章は添削と模範解答の生成のため、Claude APIを通じてAnthropic PBC（米国）へ送信されます。',
      '送信された文章は添削結果の生成にのみ使用されます。運営者は自社サーバーを持たず、入力内容を別途保存しません。',
      '送信されたデータの取り扱いはAnthropicのポリシーに従います。作文入力欄に個人情報や機微情報を入力しないでください。',
      'Anthropicプライバシーポリシー: <a href="https://www.anthropic.com/legal/privacy">anthropic.com/legal/privacy</a>',
    ],
    adsHead: '広告サービス',
    ads: [
      '本アプリはGoogle AdMobを通じて広告を提供する場合があります。AdMobは広告配信およびパーソナライズのため、広告識別子（IDFA/GAID）、端末情報、IPアドレス等を収集・利用する場合があります。',
      'iOS: アプリ起動時にATT（アプリのトラッキング透明性）同意のポップアップが表示されます。同意しない場合は非パーソナライズ広告が表示されます。',
      'Android: 設定 → Google → 広告で広告IDのリセットまたは広告のパーソナライズをオフにできます。',
    ],
    googlePolicy: 'Googleプライバシーポリシー: <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>',
    thirdHead: '第三者提供',
    third: ['本アプリが直接収集した個人情報を第三者に提供することはありません。', 'ただし、以下のサービスの利用時に当該事業者へデータが渡る場合があります。'],
    thirdList: ['広告: Google AdMobへ広告識別子および端末情報を提供（広告サービス参照）', '作文添削: 入力した文章をAnthropic PBCへ提供（쓰GO項目参照）', '音声出力: 発音再生にOS内蔵の音声エンジンを使用し、外部送信はありません'],
    intlHead: '国外移転',
    intl: ['本アプリは全世界に提供されるため、一部のデータが利用者の国外のサーバーで処理される場合があります。', 'Anthropic PBC（米国） — 쓰GOに入力した文章', 'Google LLC — 広告および関連する端末データ'],
    retainHead: '保有および利用期間',
    retain: ['本アプリが保存するすべての学習データ（進度・復習キュー等）は利用者の端末にのみ保存され、アプリ削除時に直ちに破棄されます。', '広告識別子関連データの保有期間はGoogleのポリシーに、쓰GOへ送信した文章はAnthropicのポリシーに従います。'],
    rightsHead: '利用者の権利',
    rights: ['利用者はアプリ内設定でいつでも保存データを削除できます。'],
    rightsList: ['学習記録: アプリ内設定 → データ初期化', '全データ: 端末からアプリを削除'],
    rightsTail: '広告トラッキングの拒否は、iOS 設定 → プライバシー → トラッキング、Android 設定 → Google → 広告で変更できます。',
    contactHead: '個人情報保護責任者',
    contact: '個人情報に関するお問い合わせは以下までご連絡ください。',
    contactList: [`運営者: ${OPERATOR}`, `メール: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ 最小限の収集',
    info: '本アプリは会員登録・ログインがなく、アプリ自体は個人を識別する情報を収集しません。文章は쓰GO利用時にのみ外部へ送信され、広告識別子はGoogle AdMobにより収集されます（iOSでは同意後）。',
    footerTerms: '利用規約',
  },
  zh: {
    intro: 'BaeuGO（以下称"本应用"）以下列目的运营。',
    purpose: ['提供韩语单词、语法及 TOPIK 考试备考内容', '为写作练习功能（쓰GO）提供 AI 批改', '学习进度与间隔重复（复习）管理', '发送学习提醒通知', '提供广告服务（Google AdMob）'],
    collectIntro: '本应用无需注册或登录即可使用，且不收集可识别个人身份的信息。但在使用部分功能时，可能会用到以下项目。',
    items: [
      ['🔔', '通知', '用于发送学习提醒。可在设备设置中关闭。'],
      ['📱', '设备本地存储', '学习进度、复习队列与设置仅保存在设备本地。'],
      ['✍️', '您输入的文本（쓰GO）', '为进行 AI 批改，您输入的韩语句子会发送至外部 AI 服务。请参阅下方说明。'],
      ['📢', '广告标识符（IDFA/GAID）', 'Google AdMob 可能出于广告个性化目的收集。iOS 上仅在获得应用跟踪透明度（ATT）同意后收集。'],
    ],
    writingHead: '쓰GO AI 批改（外部传输）',
    writing: [
      '使用 쓰GO 写作功能时，您输入的韩语文本会通过 Claude API 发送至 Anthropic PBC（美国），用于生成批改与范文。',
      '所传输的文本仅用于生成批改结果。运营者不设自有服务器，也不另行存储您的写作内容。',
      '所传输数据的处理遵循 Anthropic 的政策。请勿在写作框中输入个人信息或敏感信息。',
      'Anthropic 隐私政策: <a href="https://www.anthropic.com/legal/privacy">anthropic.com/legal/privacy</a>',
    ],
    adsHead: '广告服务',
    ads: [
      '本应用可能通过 Google AdMob 提供广告。AdMob 可能出于广告投放与个性化目的收集并使用广告标识符（IDFA/GAID）、设备信息及 IP 地址等。',
      'iOS：应用启动时会显示应用跟踪透明度（ATT）同意弹窗。若不同意，将仅显示非个性化广告。',
      'Android：可在 设置 → Google → 广告 中重置广告 ID 或关闭广告个性化。',
    ],
    googlePolicy: 'Google 隐私政策: <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>',
    thirdHead: '向第三方提供',
    third: ['本应用不会将其直接收集的个人信息提供给第三方。', '但在使用以下服务时，数据可能被传输给相应运营方：'],
    thirdList: ['广告：向 Google AdMob 提供广告标识符及设备信息（见广告服务）', '写作批改：将您输入的文本提供给 Anthropic PBC（见 쓰GO 说明）', '语音输出：发音播放使用系统内置语音引擎，无外部传输'],
    intlHead: '跨境传输',
    intl: ['由于本应用面向全球提供，部分数据可能在您所在国家以外的服务器上处理：', 'Anthropic PBC（美国）— 您提交给 쓰GO 的文本', 'Google LLC — 广告及相关设备数据'],
    retainHead: '保留与使用期限',
    retain: ['本应用保存的所有学习数据（进度、复习队列等）仅存储于您的设备，删除应用时立即销毁。', '广告标识符相关数据的保留遵循 Google 政策；发送至 쓰GO 的文本遵循 Anthropic 政策。'],
    rightsHead: '用户权利',
    rights: ['您可随时在应用设置中删除已保存的数据。'],
    rightsList: ['学习记录：应用设置 → 重置数据', '全部数据：从设备卸载应用'],
    rightsTail: '拒绝广告跟踪可在 iOS 设置 → 隐私 → 跟踪，或 Android 设置 → Google → 广告 中更改。',
    contactHead: '个人信息保护负责人',
    contact: '如有个人信息相关问题，请通过以下方式联系我们。',
    contactList: [`运营者：${OPERATOR}`, `邮箱：<a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ 最小化收集',
    info: '本应用无注册与登录，应用本身不收集可识别个人身份的信息。仅在使用 쓰GO 时才会向外部传输文本，广告标识符由 Google AdMob 收集（iOS 上须先同意）。',
    footerTerms: '服务条款',
  },
  vi: {
    intro: 'BaeuGO (sau đây gọi là "Ứng dụng") được vận hành với các mục đích sau.',
    purpose: ['Cung cấp nội dung từ vựng, ngữ pháp tiếng Hàn và luyện thi TOPIK', 'Cung cấp nhận xét bằng AI cho tính năng luyện viết (쓰GO)', 'Quản lý tiến độ học và ôn tập theo khoảng cách (lặp lại ngắt quãng)', 'Gửi thông báo nhắc học', 'Cung cấp dịch vụ quảng cáo (Google AdMob)'],
    collectIntro: 'Ứng dụng hoạt động mà không cần đăng ký hay đăng nhập và không thu thập thông tin nhận dạng cá nhân. Tuy nhiên, các mục sau có thể được sử dụng khi bạn dùng một số tính năng.',
    items: [
      ['🔔', 'Thông báo', 'Dùng để gửi nhắc nhở học tập. Bạn có thể tắt trong cài đặt thiết bị.'],
      ['📱', 'Bộ nhớ trên thiết bị', 'Tiến độ học, hàng đợi ôn tập và cài đặt chỉ được lưu trên thiết bị của bạn.'],
      ['✍️', 'Văn bản bạn nhập (쓰GO)', 'Câu tiếng Hàn bạn viết để nhận nhận xét bằng AI sẽ được gửi đến dịch vụ AI bên ngoài. Xem mục bên dưới.'],
      ['📢', 'Mã nhận dạng quảng cáo (IDFA/GAID)', 'Google AdMob có thể thu thập nhằm cá nhân hóa quảng cáo. Trên iOS, việc này chỉ diễn ra sau khi bạn đồng ý Minh bạch theo dõi ứng dụng (ATT).'],
    ],
    writingHead: '쓰GO Nhận xét viết bằng AI (Truyền ra bên ngoài)',
    writing: [
      'Khi bạn dùng tính năng viết 쓰GO, văn bản tiếng Hàn bạn nhập sẽ được gửi đến Anthropic PBC (Hoa Kỳ) thông qua Claude API để tạo nhận xét và bài mẫu.',
      'Văn bản được gửi đi chỉ dùng để tạo kết quả nhận xét. Nhà vận hành không có máy chủ riêng và không lưu trữ riêng nội dung bạn viết.',
      'Việc xử lý dữ liệu được gửi đi tuân theo chính sách của Anthropic. Vui lòng không nhập thông tin cá nhân hoặc nhạy cảm vào ô viết.',
      'Chính sách quyền riêng tư của Anthropic: <a href="https://www.anthropic.com/legal/privacy">anthropic.com/legal/privacy</a>',
    ],
    adsHead: 'Dịch vụ quảng cáo',
    ads: [
      'Ứng dụng có thể hiển thị quảng cáo qua Google AdMob. AdMob có thể thu thập và sử dụng mã nhận dạng quảng cáo (IDFA/GAID), thông tin thiết bị và địa chỉ IP để phân phối và cá nhân hóa quảng cáo.',
      'iOS: hộp thoại đồng ý Minh bạch theo dõi ứng dụng (ATT) sẽ hiện khi khởi động. Nếu từ chối, chỉ hiển thị quảng cáo không cá nhân hóa.',
      'Android: bạn có thể đặt lại mã quảng cáo hoặc tắt cá nhân hóa quảng cáo trong Cài đặt → Google → Quảng cáo.',
    ],
    googlePolicy: 'Chính sách quyền riêng tư của Google: <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>',
    thirdHead: 'Cung cấp cho bên thứ ba',
    third: ['Chúng tôi không cung cấp cho bên thứ ba những thông tin mà chúng tôi trực tiếp thu thập.', 'Tuy nhiên, dữ liệu có thể được chuyển cho các nhà cung cấp sau khi bạn sử dụng dịch vụ của họ:'],
    thirdList: ['Quảng cáo: mã nhận dạng quảng cáo và thông tin thiết bị cho Google AdMob (xem Dịch vụ quảng cáo)', 'Nhận xét viết: văn bản bạn nhập cho Anthropic PBC (xem mục 쓰GO)', 'Đầu ra giọng nói: phát âm dùng công cụ giọng nói tích hợp của hệ điều hành, không truyền ra bên ngoài'],
    intlHead: 'Chuyển dữ liệu ra nước ngoài',
    intl: ['Vì Ứng dụng được cung cấp trên toàn cầu, một số dữ liệu có thể được xử lý trên máy chủ đặt ngoài quốc gia của bạn:', 'Anthropic PBC (Hoa Kỳ) — văn bản bạn gửi tới 쓰GO', 'Google LLC — dữ liệu quảng cáo và thiết bị liên quan'],
    retainHead: 'Thời gian lưu giữ và sử dụng',
    retain: ['Toàn bộ dữ liệu học tập mà Ứng dụng lưu (tiến độ, hàng đợi ôn tập, v.v.) chỉ được giữ trên thiết bị của bạn và bị hủy ngay khi gỡ Ứng dụng.', 'Việc lưu giữ dữ liệu mã nhận dạng quảng cáo tuân theo chính sách của Google; văn bản gửi tới 쓰GO tuân theo chính sách của Anthropic.'],
    rightsHead: 'Quyền của người dùng',
    rights: ['Bạn có thể xóa dữ liệu đã lưu bất cứ lúc nào trong cài đặt Ứng dụng.'],
    rightsList: ['Hồ sơ học tập: Cài đặt Ứng dụng → Đặt lại dữ liệu', 'Toàn bộ dữ liệu: gỡ Ứng dụng khỏi thiết bị'],
    rightsTail: 'Bạn có thể từ chối theo dõi quảng cáo trong iOS Cài đặt → Quyền riêng tư → Theo dõi, hoặc Android Cài đặt → Google → Quảng cáo.',
    contactHead: 'Người phụ trách bảo vệ thông tin cá nhân',
    contact: 'Nếu có thắc mắc về quyền riêng tư, vui lòng liên hệ với chúng tôi bên dưới.',
    contactList: [`Nhà vận hành: ${OPERATOR}`, `Email: <a href="mailto:${EMAIL}">${EMAIL}</a>`],
    infoHead: '🛡️ Thu thập tối thiểu',
    info: 'Ứng dụng không có đăng ký hay đăng nhập và bản thân Ứng dụng không thu thập thông tin nhận dạng cá nhân. Văn bản chỉ được truyền ra bên ngoài khi bạn dùng 쓰GO, và mã nhận dạng quảng cáo do Google AdMob thu thập (trên iOS, chỉ sau khi bạn đồng ý).',
    footerTerms: 'Điều khoản dịch vụ',
  },
};

// ─────────────────────────── 이용약관 본문
const TERMS = {
  en: {
    s1h: 'Article 1 (Purpose)', s1: `These Terms govern the conditions and procedures for using the mobile application "BaeuGO" (the "App") provided by ${OPERATOR} (the "Operator"), and the rights, obligations, and responsibilities between the Operator and the user.`,
    s2h: 'Article 2 (Services)', s2: 'The App provides the following services.',
    s2list: ['Korean vocabulary, grammar, and TOPIK exam-prep content', 'Writing practice with AI feedback and model answers (쓰GO)', 'Mock tests and weakness analysis', 'Premium features via in-app purchase (Plus)', 'Additional free content through ad viewing'],
    s3h: 'Article 3 (User Obligations)', s3: 'The user must not do the following.',
    s3list: ['Reproduce, redistribute, or commercially use the learning content without permission', 'Attempt to reverse-engineer, decompile, or extract the source of the App', 'Interfere with the normal operation of the App or infringe the Operator\'s rights'],
    s4h: '⚠️ Article 4 (Limitation of Liability)',
    s4: [
      '① The learning content is reference material to support Korean learning and does not guarantee exam success or any specific learning outcome.',
      '② The content may contain some errors; please give priority to official exam (TOPIK, etc.) materials. The Operator is not liable for damages arising from content errors.',
      '③ Feedback from the 쓰GO writing feature is generated by AI and may be inaccurate or incomplete. It is a study aid and is not an official grade or evaluation.',
      '④ The Operator is not liable for damages caused by force majeure, communication failures, or outages of third-party services (Google, Apple, AdMob, Anthropic, etc.).',
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
    s2list: ['한국어 단어·문법·TOPIK 시험 준비 콘텐츠 제공', 'AI 첨삭과 모범답안을 제공하는 쓰기 연습(쓰GO)', '모의고사 및 약점 분석', '인앱 결제(Plus)를 통한 프리미엄 기능 제공', '광고 시청을 통한 무료 콘텐츠 추가 제공'],
    s3h: '제3조 (이용자의 의무)', s3: '이용자는 다음 행위를 해서는 안 됩니다.',
    s3list: ['앱의 학습 콘텐츠를 무단으로 복제·재배포·상업적 이용', '앱을 역공학·디컴파일·소스 추출 시도', '앱의 정상 동작을 방해하거나 운영자의 권리를 침해하는 행위'],
    s4h: '⚠️ 제4조 (운영자의 책임 제한)',
    s4: [
      '① 앱이 제공하는 학습 콘텐츠는 한국어 학습 보조를 위한 참고 자료이며, 시험 합격이나 특정 학습 성과를 보장하지 않습니다.',
      '② 학습 콘텐츠에 일부 오류가 포함될 수 있으며, 공식 시험(TOPIK 등) 자료를 우선시하시기 바랍니다. 운영자는 콘텐츠 오류로 발생한 손해에 대해 책임지지 않습니다.',
      '③ 쓰GO 쓰기 기능의 첨삭은 AI가 생성하며 부정확하거나 불완전할 수 있습니다. 이는 학습 보조 수단이며 공식 채점이나 평가가 아닙니다.',
      '④ 천재지변, 통신장애, 제3자 서비스(Google·Apple·AdMob·Anthropic 등) 장애로 발생한 손해에 대해 운영자는 책임지지 않습니다.',
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
    s2list: ['韓国語の単語・文法・TOPIK試験対策コンテンツの提供', 'AI添削と模範解答を提供する作文練習（쓰GO）', '模擬試験および弱点分析', 'アプリ内課金（Plus）によるプレミアム機能の提供', '広告視聴による無料コンテンツの追加提供'],
    s3h: '第3条（利用者の義務）', s3: '利用者は次の行為をしてはなりません。',
    s3list: ['本アプリの学習コンテンツを無断で複製・再配布・商業利用すること', '本アプリのリバースエンジニアリング・逆コンパイル・ソース抽出を試みること', '本アプリの正常な動作を妨げ、または運営者の権利を侵害する行為'],
    s4h: '⚠️ 第4条（運営者の責任制限）',
    s4: [
      '① 本アプリが提供する学習コンテンツは韓国語学習補助のための参考資料であり、試験合格や特定の学習成果を保証しません。',
      '② 学習コンテンツには一部の誤りが含まれる場合があり、公式試験（TOPIK等）の資料を優先してください。運営者はコンテンツの誤りにより生じた損害について責任を負いません。',
      '③ 쓰GO作文機能の添削はAIが生成するものであり、不正確または不完全な場合があります。これは学習補助手段であり、公式な採点や評価ではありません。',
      '④ 天災地変、通信障害、第三者サービス（Google・Apple・AdMob・Anthropic等）の障害により生じた損害について、運営者は責任を負いません。',
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
    s2list: ['提供韩语单词、语法及 TOPIK 考试备考内容', '提供 AI 批改与范文的写作练习（쓰GO）', '模拟考试及弱点分析', '通过应用内购买（Plus）提供高级功能', '通过观看广告额外提供免费内容'],
    s3h: '第3条（用户义务）', s3: '用户不得进行以下行为。',
    s3list: ['未经许可复制、再分发或商业使用本应用的学习内容', '尝试对本应用进行逆向工程、反编译或提取源代码', '妨碍本应用正常运行或侵犯运营者权利的行为'],
    s4h: '⚠️ 第4条（运营者的责任限制）',
    s4: [
      '① 本应用提供的学习内容为辅助韩语学习的参考资料，不保证考试合格或任何特定学习成果。',
      '② 学习内容可能包含部分错误，请以官方考试（TOPIK 等）资料为准。运营者对因内容错误产生的损害不承担责任。',
      '③ 쓰GO 写作功能的批改由 AI 生成，可能不准确或不完整。它是学习辅助手段，并非官方评分或评价。',
      '④ 对于因不可抗力、通信故障或第三方服务（Google、Apple、AdMob、Anthropic 等）故障造成的损害，运营者不承担责任。',
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
    s2list: ['Nội dung từ vựng, ngữ pháp tiếng Hàn và luyện thi TOPIK', 'Luyện viết kèm nhận xét AI và bài mẫu (쓰GO)', 'Thi thử và phân tích điểm yếu', 'Tính năng cao cấp qua mua trong ứng dụng (Plus)', 'Nội dung miễn phí bổ sung thông qua xem quảng cáo'],
    s3h: 'Điều 3 (Nghĩa vụ của người dùng)', s3: 'Người dùng không được thực hiện các hành vi sau.',
    s3list: ['Sao chép, phân phối lại hoặc sử dụng thương mại nội dung học tập mà không được phép', 'Cố gắng dịch ngược, phân rã hoặc trích xuất mã nguồn của Ứng dụng', 'Cản trở hoạt động bình thường của Ứng dụng hoặc xâm phạm quyền của Nhà vận hành'],
    s4h: '⚠️ Điều 4 (Giới hạn trách nhiệm)',
    s4: [
      '① Nội dung học tập là tài liệu tham khảo hỗ trợ học tiếng Hàn và không bảo đảm việc thi đỗ hay bất kỳ kết quả học tập cụ thể nào.',
      '② Nội dung có thể chứa một số lỗi; vui lòng ưu tiên tài liệu thi chính thức (TOPIK, v.v.). Nhà vận hành không chịu trách nhiệm về thiệt hại phát sinh từ lỗi nội dung.',
      '③ Nhận xét từ tính năng viết 쓰GO do AI tạo ra và có thể không chính xác hoặc chưa đầy đủ. Đây là công cụ hỗ trợ học tập, không phải điểm số hay đánh giá chính thức.',
      '④ Nhà vận hành không chịu trách nhiệm về thiệt hại do bất khả kháng, sự cố liên lạc hoặc sự cố của dịch vụ bên thứ ba (Google, Apple, AdMob, Anthropic, v.v.).',
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
// 개인정보처리방침 9개 섹션 이름 (조 번호는 articleFmt로 붙인다)
const PRIV_NAMES = {
  en: ['Purpose of Processing', 'Items Collected', '쓰GO AI Writing Feedback', 'Advertising Services', 'Provision to Third Parties', 'International Transfer', 'Retention and Use Period', 'Your Rights', 'Privacy Officer'],
  ko: ['개인정보의 처리 목적', '수집하는 항목', '쓰GO AI 첨삭', '광고 서비스', '개인정보의 제3자 제공', '개인정보의 국외 이전', '개인정보의 보유 및 이용기간', '이용자의 권리', '개인정보 보호책임자'],
  ja: ['個人情報の処理目的', '収集する項目', '쓰GO AI添削', '広告サービス', '第三者提供', '国外移転', '保有および利用期間', '利用者の権利', '個人情報保護責任者'],
  zh: ['处理目的', '收集的项目', '쓰GO AI 批改', '广告服务', '向第三方提供', '跨境传输', '保留与使用期限', '用户权利', '个人信息保护负责人'],
  vi: ['Mục đích xử lý', 'Các mục thu thập', '쓰GO Nhận xét viết AI', 'Dịch vụ quảng cáo', 'Cung cấp cho bên thứ ba', 'Chuyển ra nước ngoài', 'Thời gian lưu giữ và sử dụng', 'Quyền của người dùng', 'Người phụ trách BV thông tin cá nhân'],
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
    card(ph(lang, 3), paras(p.writing)),
    card(ph(lang, 4), paras(p.ads) + '\n' + `      <p>${p.googlePolicy}</p>`),
    card(ph(lang, 5), paras(p.third) + '\n' + ul(p.thirdList)),
    card(ph(lang, 6), `      <p>${p.intl[0]}</p>\n` + ul(p.intl.slice(1))),
    card(ph(lang, 7), paras(p.retain)),
    card(ph(lang, 8), `      <p>${p.rights[0]}</p>\n${ul(p.rightsList)}\n      <p>${p.rightsTail}</p>`),
    card(ph(lang, 9), `      <p>${p.contact}</p>\n${ul(p.contactList)}`),
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
