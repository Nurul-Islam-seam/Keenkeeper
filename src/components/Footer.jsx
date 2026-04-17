import facebookIcon from '../assets/facebook.png'
import instagramIcon from '../assets/instagram.png'
import logoXL from '../assets/logo-xl.png'
import twitterIcon from '../assets/twitter.png'

const socialLinks = [
  { id: 'facebook', href: '#', icon: facebookIcon },
  { id: 'instagram', href: '#', icon: instagramIcon },
  { id: 'twitter', href: '#', icon: twitterIcon },
]

function Footer() {
  return (
    <footer className="mt-12 bg-[#1F5A49] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <img src={logoXL} alt="KeenKeeper" className="h-16 w-auto sm:h-20" />
          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-white/95">Social Links</h3>
          <div className="mt-3 flex items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-label={item.id}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-sm font-bold text-slate-900 transition hover:scale-105 hover:bg-white"
              >
                <img src={item.icon} alt={item.id} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-4 text-center text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>© 2026 KeenKeeper. All rights reserved.</p>

          <div className="flex items-center justify-center gap-6">
            <a href="#" className="transition hover:text-white/80">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-white/80">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-white/80">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
