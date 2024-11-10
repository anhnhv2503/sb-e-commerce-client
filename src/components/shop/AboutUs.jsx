import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";
import { useDocumentTitle } from "@uidotdev/usehooks";

const AboutUs = () => {
  useDocumentTitle("About Us");
  const handleContactUs = () => {
    toast.success("We'll get back to you soon!");
  };

  return (
    <div>
      <section className="bg-gradient-to-tr from-indigo-500 to-teal-500 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">About Our Company</h1>
          <p className="text-lg mb-8">
            We're passionate about delivering the best products and experiences
            to our customers.
          </p>
          <Button
            className="bg-gray-700 hover:bg-gray-500 text-white"
            onClick={handleContactUs}
          >
            Contact Us
          </Button>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600">
              We aim to provide innovative and sustainable solutions to help you
              achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Quality Products</h3>
              <p className="text-gray-600">
                We strive to offer top-notch products that are both reliable and
                affordable, ensuring our customers are always satisfied.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">
                Sustainable Practices
              </h3>
              <p className="text-gray-600">
                Sustainability is at the core of everything we do, from sourcing
                materials to delivering the final product.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              We are a diverse group of professionals committed to excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <img
                  src="https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxM3x8Y2F0fGVufDB8MHx8fDE3MjE4MjIxNzl8MA&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="Team Member 1"
                  className="rounded-t-lg w-full h-56 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">Johnny Nguyen</h3>
                <p className="text-gray-600">CEO & Founder</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button variant="link" className="text-gray-600">
                  LinkedIn Profile
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-white shadow-md">
              <CardHeader>
                <img
                  src="https://images.unsplash.com/photo-1517451330947-7809dead78d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjYXR8ZW58MHwwfHx8MTcyMTgyMjE3OXww&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="Team Member 2"
                  className="rounded-t-lg w-full h-56 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Nguyen Ha Viet Anh
                </h3>
                <p className="text-gray-600">Chief Technology Officer</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button variant="link" className="text-gray-600">
                  LinkedIn Profile
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-white shadow-md">
              <CardHeader>
                <img
                  src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxjYXR8ZW58MHwwfHx8MTcyMTgyMjE3OXww&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="Team Member 3"
                  className="rounded-t-lg w-full h-56 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Viet Anh Nguyen Ha
                </h3>
                <p className="text-gray-600">Head of Marketing</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button variant="link" className="text-gray-600">
                  LinkedIn Profile
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <Toaster />
    </div>
  );
};

export default AboutUs;
