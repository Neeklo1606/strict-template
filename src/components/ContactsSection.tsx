import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import contactMap from '@/assets/contact-map.jpg';

const ContactsSection = React.forwardRef<HTMLElement>((_, ref) => (
  <section ref={ref} className="py-8 sm:py-12">
    <div className="max-w-[1400px] mx-auto px-4">
      <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">Свяжитесь с <span className="text-primary">LiveGrid</span></h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">+7 (904) 539-34-34</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <p className="text-xs sm:text-sm">info@livegrid.ru</p>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <p className="text-xs sm:text-sm">г. Белгород, пр-т Славы, д. 100</p>
          </div>
          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
            {['VK', 'TG', 'YT', 'OK'].map((s, i) => (
              <a key={i} href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center text-[10px] sm:text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden min-h-[240px] sm:min-h-[300px]">
          <img src={contactMap} alt="Расположение офиса LiveGrid" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-xs font-semibold">LiveGrid — Главный офис</p>
            <p className="text-[11px] text-muted-foreground">г. Белгород, пр-т Славы, д. 100</p>
          </div>
        </div>
      </div>
    </div>
  </section>
));

ContactsSection.displayName = 'ContactsSection';

export default ContactsSection;
