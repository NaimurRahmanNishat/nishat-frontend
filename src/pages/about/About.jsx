import React from 'react'

const About = () => {
  return (
    <div className='pt-20'>
       <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>

      <p className="text-lg mb-6">
        Welcome to <span className="font-semibold text-blue-600">ShopEase</span>, your one-stop destination for the latest in electronics, fashion, and more.
        We're passionate about bringing you high-quality products at competitive prices — all with seamless shopping experiences.
      </p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p>
          To empower customers with affordable and reliable products, backed by exceptional customer service and fast delivery.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Customer Satisfaction</li>
          <li>Product Quality</li>
          <li>Transparency & Trust</li>
          <li>Innovation & Growth</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
        <p>
          We blend technology and convenience to create a smooth, reliable, and enjoyable online shopping experience for everyone.
        </p>
      </div>
    </div>
    </div>
  )
}

export default About;