
import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
    
          <div>
            <Link href="/">
              <Image 
                src="/assets/img/logo/logo.png" 
                alt="VTC Academy" 
                width={150} 
                height={50}
                className="mb-4 brightness-0 invert"
              />
            </Link>
            <p className="text-sm">
              Turning Passion into Career – VTC Academy
            </p>
          </div>


          <div>
            <h4 className="text-white font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Custom Service</Link></li>
              <li><Link href="#" className="hover:text-white">FAQs</Link></li>
              <li><Link href="/track" className="hover:text-white">Ordering Tracking</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contacts</Link></li>
              <li><Link href="#" className="hover:text-white">Events</Link></li>
            </ul>
          </div>

      
          <div>
            <h4 className="text-white font-semibold mb-4">My Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Delivery Information</Link></li>
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white">Discount</Link></li>
              <li><Link href="#" className="hover:text-white">Custom Service</Link></li>
              <li><Link href="#" className="hover:text-white">Terms Condition</Link></li>
            </ul>
          </div>

        
          <div>
            <h4 className="text-white font-semibold mb-4">Get Newsletter</h4>
            <p className="text-sm mb-4">
              Get on the list and get 10% off your first order!
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-gray-600"
              />
              <button className="px-6 py-2 bg-white text-gray-900 rounded font-medium hover:bg-gray-100">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

  
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              Copyright 2025 <Link href="/" className="text-white hover:underline">©VTC Academy</Link>. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              <Link href="tel:1900292958" className="hover:text-white">
                1900 292958
              </Link>
              <span className="text-gray-600">|</span>
              <span>Working 8:00 - 22:00</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}