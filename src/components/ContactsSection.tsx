import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactsSection = React.forwardRef<HTMLElement>((_, ref) => (
  <section ref={ref} className="py-8 sm:py-12">
    <div className="max-w-[1400px] mx-auto px-4">
      <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">Свяжитесь с <span className="text-primary">LiveGrid</span></h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">+7 (4) 333 44 11</p>
              <p className="text-xs sm:text-sm text-muted-foreground">+7 (4) 333 66 12</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <p className="text-xs sm:text-sm">info@livegrid.ru</p>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <p className="text-xs sm:text-sm">Москва, ул. Примерная, д. 1</p>
          </div>
          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
            {['VK', 'TG', 'YT', 'OK'].map((s, i) => (
              <a key={i} href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center text-[10px] sm:text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
        <div className="bg-accent rounded-xl flex items-center justify-center min-h-[240px] sm:min-h-[300px]">
          <span className="text-2xl sm:text-3xl font-bold text-primary">VIDEO</span>
        </div>
      </div>
    </div>
  </section>
));

ContactsSection.displayName = 'ContactsSection';

export default ContactsSection;
