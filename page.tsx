"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { Menu, Moon, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0.2, 1])

  // Refs for scroll animations
  const productSectionRef = useRef(null)
  const newsletterSectionRef = useRef(null)
  const isProductSectionInView = useInView(productSectionRef, { once: false, amount: 0.1 })
  const isNewsletterInView = useInView(newsletterSectionRef, { once: false, amount: 0.3 })

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const categories = ["All", "Tops", "Bottoms", "Accessories", "Footwear"]

  const products = [
    {
      id: 1,
      name: "Distressed Mesh Top",
      price: 45.99,
      category: "Tops",
      image: "https://namedcollective.com/cdn/shop/files/404-error-bunny-hoodie-baby-pink-1.jpg?v=1741859675&width=1680",
    },
    {
      id: 2,
      name: "Leather Spiked Jacket",
      price: 129.99,
      category: "Tops",
      image: "https://namedcollective.com/cdn/shop/files/WEB_COLDHEARTRHINESTONEHOODIE.jpg?v=1740753297&width=1680",
    },
    {
      id: 3,
      name: "Ripped Black Jeans",
      price: 79.99,
      category: "Bottoms",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 4,
      name: "Studded Belt",
      price: 34.99,
      category: "Accessories",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 5,
      name: "Platform Boots",
      price: 149.99,
      category: "Footwear",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 6,
      name: "Fishnet Gloves",
      price: 19.99,
      category: "Accessories",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 7,
      name: "Skull Print Hoodie",
      price: 69.99,
      category: "Tops",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 8,
      name: "Cargo Pants",
      price: 89.99,
      category: "Bottoms",
      image: "/placeholder.svg?height=400&width=300",
    },
  ]

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <div className="dark min-h-screen bg-black text-white">
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30"
        style={{ opacity: headerOpacity }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Moon className="h-6 w-6 text-purple-500" />
              </motion.div>
              <motion.span
                className="font-bold text-xl tracking-wider"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                DARKMODE
              </motion.span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {["Home", "Shop", "Collections", "About"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ y: -3 }}
                >
                  <Link href="#" className="text-sm uppercase tracking-wider hover:text-purple-400 transition-colors">
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                      delay: 0.5,
                    }}
                    className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    3
                  </motion.span>
                </Button>
              </motion.div>

              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-zinc-900 border-zinc-800 text-white">
                  <div className="flex flex-col gap-6 mt-8">
                    {["Home", "Shop", "Collections", "About"].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Link
                          href="#"
                          className="text-lg uppercase tracking-wider hover:text-purple-400 transition-colors"
                        >
                          {item}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="pt-24 pb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">EMBRACE THE DARKNESS</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Discover our curated collection of alternative fashion for those who dare to stand out.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide"
        >
          <div className="flex space-x-2 mx-auto">
            {categories.map((category) => (
              <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={activeCategory === category ? "default" : "outline"}
                  className={cn(
                    "rounded-full px-6 py-2 text-sm font-bold tracking-wider transition-all duration-300",
                    activeCategory === category
                      ? "bg-purple-700 hover:bg-purple-600 text-white border-2 border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                      : "bg-zinc-900 border-2 border-zinc-700 text-zinc-300 hover:text-white hover:border-purple-500 hover:shadow-[0_0_10px_rgba(124,58,237,0.3)]",
                  )}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={productSectionRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isProductSectionInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                custom={index}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className="group"
              >
                <Link href="#" className="block">
                  <div className="relative overflow-hidden rounded-lg bg-zinc-900 aspect-[3/4]">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 flex items-end justify-center pb-6"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-purple-700 hover:bg-purple-600 text-white border border-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                          Add to Cart
                        </Button>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1, opacity: 0.7 }}
                      transition={{ duration: 0.4 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-purple-400 font-semibold">${product.price}</p>
                      <span className="text-xs text-zinc-500 uppercase">{product.category}</span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          ref={newsletterSectionRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isNewsletterInView ? "show" : "hidden"}
          className="mt-20 text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-6 tracking-wider">
            JOIN THE CULT
          </motion.h2>
          <motion.div variants={fadeInUp} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <motion.input
                whileFocus={{ boxShadow: "0 0 0 2px rgba(124,58,237,0.5)" }}
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-purple-700 hover:bg-purple-600 text-white border border-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                  Subscribe
                </Button>
              </motion.div>
            </div>
            <motion.p variants={fadeInUp} className="text-xs text-zinc-500 mt-2">
              Get 10% off your first order when you sign up for our newsletter.
            </motion.p>
          </motion.div>
        </motion.div>

        <div className="fixed bottom-10 right-10 z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              size="lg"
              className="rounded-full h-14 w-14 bg-purple-700 hover:bg-purple-600 text-white border-2 border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.7)]"
            >
              <ShoppingBag className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">DARKMODE</h3>
              <p className="text-zinc-400 text-sm">Alternative fashion for the bold and the rebellious.</p>
            </div>

            {["Shop", "Company", "Support"].map((section) => (
              <div key={section}>
                <h3 className="font-bold text-lg mb-4">{section}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">
                        {section} Link {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-500 text-sm">
            © {new Date().getFullYear()} DARKMODE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

