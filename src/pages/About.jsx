import React from 'react'
import Hero from '../components/Hero';

const About = () => {
  return (
    <section className='font-poppins'>
      <Hero currentPage={'About'} PreviousPage={'Home'} />

      <div>
        <section className="about-section bg-[#F9F1E7] py-20">
          <div className="container mx-auto px-6 md:px-12">
            {/* Heading */}
            <div className="text-center mb-12">
              <p className="md:text-4xl text-2xl font-bold  mt-4">
                Crafting comfort and style, one piece at a time.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="lg:order-last">
                <img
                  src="/shop.jpg"
                  alt="Our Story"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              {/* Text Section */}
              <div className="lg:order-first">
                <h3 className="text-2xl font-semibold text-[#B88E2F] mb-4">
                  Our Story
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At <span className="font-bold text-[#3A3A3A]">Furniture Haven</span>, we believe that your home
                  is a reflection of your unique personality and style. For over a decade,
                  we’ve been dedicated to creating high-quality, timeless pieces that elevate
                  your space and provide lasting comfort. Whether it's a cozy living room or
                  a sophisticated office, our furniture is designed to blend functionality with elegance.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  From selecting the finest materials to collaborating with the most skilled artisans,
                  we pour passion into every piece we create. Sustainability is also at the heart of
                  everything we do, ensuring that every product is crafted responsibly, leaving a
                  minimal footprint.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  Discover our collection, where luxury meets comfort, and let us help you transform
                  your house into a home.
                </p>

                {/* CTA Button */}
                <div className="mt-8">
                  <a
                    href="/shop"
                    className="inline-block py-3 px-8 bg-[#B88E2F] text-white rounded-md font-semibold transition-all duration-300 hover:bg-white hover:text-[#B88E2F] border border-[#B88E2F]"
                  >
                    Explore Our Collection
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </section>
  )
}

export default About;