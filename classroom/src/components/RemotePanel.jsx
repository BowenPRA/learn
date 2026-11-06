// src/components/RemotePanel.jsx
// The phone remote's pairing panel: a QR code and a room code for Mr Bowen's
// phone, how the connection stands, and the three steps to teach from it.
// Opening it turns the remote on (useDeckRemote, owned by Deck); "Done" leaves
// it on, "Turn off" ends it, and "New code" locks out every phone that held
// the old one — the panel is often on the projector, where a student could
// photograph the code.
//
// Loaded lazily by Deck: the QR encoder rides in the remote-vendor chunk, which
// a lesson never fetches until this opens. In the deck's language, like the
// rest of the chrome.
import { useEffect } from 'react'
import { Smartphone, X, RefreshCw, Power, Check, Wifi, WifiOff, Loader2 } from 'lucide-react'
import { QrCode } from '../lib/remote/QrCode.jsx'
import { remoteUrl } from '../lib/useDeckRemote.js'
import { tr } from '../lib/lang.js'

export default function RemotePanel({ lang = 'en', remote, isDisplayMode = false, onClose }) {
  const t = (en, vn, fr) => tr(lang, en, vn, fr)
  const { room, status, phones, stop, renew } = remote
  const url = room ? remoteUrl(room) : ''

  // Escape closes; handled here so it works in project mode too.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose() }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose])

  let line
  if (phones > 1) {
    line = { tone: 'warn', icon: Wifi, text: t(
      `${phones} phones connected. If one is not yours, press New code.`,
      `${phones} điện thoại đã kết nối. Nếu có máy không phải của bạn, bấm Mã mới.`,
      `${phones} téléphones connectés. Si l’un n’est pas à toi, appuie sur Nouveau code.`,
    ) }
  } else if (phones === 1) {
    line = { tone: 'ok', icon: Check, text: t('Phone connected', 'Điện thoại đã kết nối', 'Téléphone connecté') }
  } else if (status === 'offline') {
    line = { tone: 'warn', icon: WifiOff, text: t('No internet: the phone cannot reach this laptop.', 'Không có mạng: điện thoại không kết nối được với máy này.', 'Pas d’internet : le téléphone ne peut pas joindre cet ordinateur.') }
  } else if (status === 'live') {
    line = { tone: 'wait', icon: Smartphone, text: t('Waiting for your phone', 'Đang chờ điện thoại', 'En attente du téléphone') }
  } else {
    line = { tone: 'wait', icon: Loader2, spin: true, text: t('Connecting…', 'Đang kết nối…', 'Connexion…') }
  }
  const lineTone = {
    ok: 'text-[#3d8c02] dark:text-[#7ee03b]',
    warn: 'text-[#c25e12] dark:text-amber-300',
    wait: 'text-slate-500 dark:text-slate-400',
  }[line.tone]
  const LineIcon = line.icon

  const steps = [
    t('Scan the code with your phone’s camera.', 'Quét mã bằng camera điện thoại.', 'Scanne le code avec l’appareil photo du téléphone.'),
    // The phone can switch display mode but not the browser's fullscreen (that
    // needs a click or key here), so F11 once makes its Full screen fill the screen.
    t('Press F11 on this laptop once. Your phone then turns Full screen on and off.', 'Bấm F11 trên máy tính này một lần. Sau đó điện thoại bật và tắt Full screen.', 'Appuie une fois sur F11 sur cet ordinateur. Ton téléphone active et désactive ensuite Full screen.'),
    t('Teach from your phone.', 'Dạy bằng điện thoại.', 'Fais cours depuis ton téléphone.'),
  ]

  return (
    <div
      className="fixed inset-0 z-[9999] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${isDisplayMode ? 'max-w-3xl' : 'max-w-2xl'} bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border-4 border-slate-200 dark:border-slate-700 overflow-hidden animate-in zoom-in-95 duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1cb0f6] text-white border-b-4 border-black/10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-xl p-2 border border-white/30 shadow-inner">
              <Smartphone className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="text-lg font-black tracking-tight leading-none">
              {t('Phone remote', 'Điều khiển bằng điện thoại', 'Télécommande sur téléphone')}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/15 hover:bg-rose-500 text-white transition-colors active:scale-95"
            title={t('Close (Esc)', 'Đóng (Esc)', 'Fermer (Échap)')}
          >
            <X className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
          <div className="shrink-0 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white p-2">
            {url && <QrCode text={url} ink="#0f172a" className={isDisplayMode ? 'w-56 h-56 sm:w-64 sm:h-64' : 'w-48 h-48 sm:w-52 sm:h-52'} />}
          </div>

          <div className="min-w-0 flex-1 w-full">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              {t('Room code', 'Mã phòng', 'Code de la salle')}
            </div>
            <div className="font-black text-5xl tracking-[0.25em] text-slate-900 dark:text-white leading-tight tabular-nums">{room}</div>
            <div className="mt-1 text-xs font-bold text-slate-400 dark:text-slate-500 break-all">{url.replace(/^https?:\/\//, '')}</div>

            <ol className="mt-5 space-y-2">
              {steps.map((step, k) => (
                <li key={k} className="flex items-start gap-3 font-bold text-slate-700 dark:text-slate-200">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#1cb0f6]/15 text-[#1899d6] dark:text-[#5cc8fa] text-xs font-black flex items-center justify-center mt-0.5">{k + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className={`mt-5 flex items-start gap-2 font-black text-sm ${lineTone}`}>
              <LineIcon className={`w-5 h-5 shrink-0 ${line.spin ? 'animate-spin' : ''}`} strokeWidth={2.5} />
              <span>{line.text}</span>
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t-2 border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
            {t('Stays on in this tab until you close it.', 'Giữ kết nối trong tab này cho đến khi bạn đóng tab.', 'Reste actif dans cet onglet jusqu’à sa fermeture.')}
          </p>
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <button
              onClick={renew}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-black uppercase tracking-widest text-xs text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
              title={t('A new code: every phone must scan again', 'Mã mới: mọi điện thoại phải quét lại', 'Nouveau code : chaque téléphone doit scanner à nouveau')}
            >
              <RefreshCw className="w-4 h-4" strokeWidth={3} />
              {t('New code', 'Mã mới', 'Nouveau code')}
            </button>
            <button
              onClick={() => { stop(); onClose() }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-black uppercase tracking-widest text-xs text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:hover:bg-rose-950/40 active:scale-95"
            >
              <Power className="w-4 h-4" strokeWidth={3} />
              {t('Turn off', 'Tắt', 'Désactiver')}
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#58cc02] border-b-4 border-[#58a700] text-white font-black uppercase tracking-widest text-sm active:border-b-0 active:translate-y-1 transition-all"
            >
              <Check className="w-5 h-5" strokeWidth={3} />
              {t('Done', 'Xong', 'Terminé')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
