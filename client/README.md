# 🛡️ Nexus Gadget Shop

**Nexus Gadget Shop** is a premium, full-stack e-commerce catalog application built with **Next.js 16** and **Express.js**. It provides a seamless experience for browsing high-end gadgets with a dedicated admin panel for inventory management.

## 🔗 Live Links

🔗 **Live Deployment:** [https://nexus-gadget-shop.vercel.app](https://nexus-gadget-shop.vercel.app)  
🔗 **Backend API:** [https://nexus-gadget-shop.vercel.app/api/items](https://nexus-gadget-shop.vercel.app/api/items)

---

## ⚡ Features & Brief Explanation

* **7-Section Landing Page:** A comprehensive homepage featuring Hero, Trending Products, Categories, Featured Specs, User Reviews, Partners, and Newsletter.
* **NextAuth.js Authentication:** Secure admin access using Credentials Provider. It uses JWT strategy and cookies to manage sessions.
* **Protected Admin Route:** The `/add-item` page is restricted via Next.js Middleware. Unauthenticated users are automatically redirected to the login page.
* **Multi-step Product Launch Form:** A clean 3-step wizard (Basic Details -> Technical Specs -> Logistics) with Zod validation to ensure data integrity before storing in MongoDB.
* **Dynamic Product Catalog:** Fetches data from an Express API. Includes dynamic routing for individual item details based on MongoDB ObjectIDs.
* **Toast Notifications & UI Feedback:** Uses `Sonner` for success/error messages and `framer-motion` for smooth layout transitions.
* **Responsive Dark UI:** Built with Tailwind CSS 4, focusing on a premium dark-mode aesthetic that works on all screen sizes.

---

## 🏠 Route Summary

| Route | Access | Description |
| :--- | :--- | :--- |
| `/` | Public | Homepage with marketing sections. |
| `/items` | Public | Product list with category filters. |
| `/items/[id]` | Public | Dynamic detail page for a specific gadget. |
| `/login` | Public | Admin login portal. |
| `/add-item` | **Private** | Secure form to add products to the database. |

---

## 🔑 Mock Login Credentials
To test the protected route and add new items:
- **Email:** `admin@nexus.com`
- **Password:** `nexus123`

---

## 🛠️ Technologies Used

- **Frontend:** Next.js 16 (App Router), Tailwind CSS 4, Framer Motion, Lucide React.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas.
- **Auth:** NextAuth.js.

---

## 💻 Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/siam-khan-alt/Nexus-Gadget.git](https://github.com/siam-khan-alt/Nexus-Gadget.git)
    npm install
   npm run dev
````


 2. **Setup Environment Variables**

#### Create a .env file and add:
```base
NEXTAUTH_SECRET=Your secret key
NEXT_PUBLIC_API_URL=https://nexus-gadget-shop.vercel.app
NEXTAUTH_URL=https://nexus-gadget-shop.vercel.app 

MONGODB_URI= Your mongodb uri