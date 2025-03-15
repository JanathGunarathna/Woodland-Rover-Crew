import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Facebook, 
  Instagram, 
  MapPin, 
  Clock, 
  Send,
  Loader2
} from 'lucide-react';
import { 
  Card,
  CardHeader,
  CardContent,
} from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Textarea } from "../../components/ui/textarea.jsx";
import MyNavbar from './MyUserNavbar.jsx';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Success Message */}
      {submitted && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-down">
          Message sent successfully!
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <MyNavbar />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-4">
            {/* Office Information */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-blue-50 pb-4">
                <h2 className="text-xl font-semibold text-gray-800">Office Information</h2>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Our Location</p>
                      <p className="text-sm">000, Maligapitiy Road,</p>
                      <p className="text-sm">Kurunegala, Sri Lanka</p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Business Hours</p>
                      {/* <p className="text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p> */}
                      <p className="text-sm">Sunday: 09:00 AM - 05:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-blue-50 pb-4">
                <h2 className="text-xl font-semibold text-gray-800">Contact Methods</h2>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {/* Email */}
                  <a href="mailto:contact@example.com" 
                     className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 group">
                    <div className="bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm">woodlandrovercrew@gmail.com</p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a href="tel:+1234567890" 
                     className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 group">
                    <div className="bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm">+94 (71) 300-2526</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-blue-50 pb-4">
                <h2 className="text-xl font-semibold text-gray-800">Connect With Us</h2>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {/* WhatsApp */}
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"
                     className="flex items-center space-x-3 text-gray-600 hover:text-green-600 group">
                    <div className="bg-green-50 p-3 rounded-full group-hover:bg-green-100 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <span>WhatsApp</span>
                  </a>

                  {/* Facebook */}
                  <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer"
                     className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 group">
                    <div className="bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <span>Facebook</span>
                  </a>

                  {/* Instagram */}
                  <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer"
                     className="flex items-center space-x-3 text-gray-600 hover:text-pink-600 group">
                    <div className="bg-pink-50 p-3 rounded-full group-hover:bg-pink-100 transition-colors duration-300">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <span>Instagram</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-blue-50 pb-4">
                <h2 className="text-xl font-semibold text-gray-800">Send us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you shortly.</p>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="abc@example.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      required
                      className="w-full min-h-[150px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-gray-200">
                <img 
                  src="\images\rover.jpg" 
                  alt="Office Location Map" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;