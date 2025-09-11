// 📌 Image imports
import fab1 from "../image/fab1.jpg";
import fab2 from "../image/fab2.jpg";
import fab3 from "../image/fab3.jpg";
import fab4 from "../image/fab4.jpg";
import fab_main from "../image/fab_main.jpg";
import aryan from "../image/aryan.jpg";

import pupils from "../image/pupils.jpg";
import balaji from "../image/balaji.jpg";
import shree from "../image/shree.jpg";
import mathrushree from "../image/mathrushree.jpg";
import fabs from "../image/fabs.jpg";

// 📌 Final Unified Data
export const pgList = [
  {
    id: 1,
    name: "Fab Hostels",
    distance: "1 km ",
    price: "7.5K - 8.5K",
    sharing: "2 / 3 Sharing",
    rating: "5.0",
    foodType: "Vegetarian Only",
    amenities: ["Wi-Fi", "Laundry", "24/7 Water", "Power Backup", "Attached Bathroom", "Housekeeping", "RO Water", "Parking"],
    image: fabs,
    images: { main: fab_main, img1: fab1, img2: fab2, img3: fab3, img4: fab4 },
    overview: { foodType: "Vegetarian", rent: "₹7,500 per month", distance: "1 km from college", sharing: "2 / 3 Sharing" },
    weeklyMenu: {
      Monday: { breakfast: "Idli & Sambar", lunch: "Dal, Rice, Roti, Veg Curry", dinner: "Paneer Butter Masala & Rice" },
      Tuesday: { breakfast: "Poha & Tea", lunch: "Rajma Chawal, Roti, Salad", dinner: "Aloo Curry & Rice" },
      Wednesday: { breakfast: "Paratha & Curd", lunch: "Chole, Rice, Roti", dinner: "Mix Veg & Chapati" },
      Thursday: { breakfast: "Upma & Tea", lunch: "Aloo Gobi, Dal, Rice", dinner: "Paneer Curry & Rice" },
      Friday: { breakfast: "Dosa & Chutney", lunch: "Vegetable Pulao & Raita", dinner: "Paneer Bhurji & Chapati" },
      Saturday: { breakfast: "Bread Omelette", lunch: "Sambhar Rice, Roti", dinner: "Veg Biryani" },
      Sunday: { breakfast: "Poori & Aloo Curry", lunch: "Veg Thali", dinner: "Paneer Tikka Masala" }
    },
    roomTypes: [
      { type: "Single Sharing", desc: "Spacious room with study table, wardrobe, and attached bathroom." },
      { type: "Double Sharing", desc: "Shared room with two separate beds, wardrobes, and common study space." },
      { type: "Triple Sharing", desc: "Economical option with three beds, storage, and shared bathroom." }
    ],
    contact: { owner: "Aryan Kumar", phone: "+91 9310625964" },
    students: [
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan },
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan },
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan }
    ]
  },
  {
    id: 2,
    name: "Pupils Nest",
    distance: "0.8 km ",
    price: "6.5K - 7.5K",
    sharing: "2 / 3 Sharing",
    rating: "4.6",
    foodType: "Vegetarian & Non-Vegetarian",
    amenities: ["Wi-Fi", "Laundry", "Non-Veg Allowed", "CCTV", "Parking"],
    image: pupils,
    images: { main: fab_main, img1: fab1, img2: fab2, img3: fab3, img4: fab4 },
    overview: { foodType: "Veg & Non-Veg", rent: "₹6,500 per month", distance: "0.8 km from college", sharing: "2 / 3 Sharing" },
    weeklyMenu: {
      Monday: { breakfast: "Upma & Tea", lunch: "Dal Fry, Rice, Roti", dinner: "Egg Curry & Rice" },
      Tuesday: { breakfast: "Paratha & Pickle", lunch: "Veg Kurma, Rice, Roti", dinner: "Chicken Curry & Rice" },
      Wednesday: { breakfast: "Idli & Sambhar", lunch: "Chana Masala, Rice", dinner: "Paneer Curry & Chapati" },
      Thursday: { breakfast: "Poha & Tea", lunch: "Rajma, Rice, Salad", dinner: "Fish Fry & Rice" },
      Friday: { breakfast: "Dosa & Chutney", lunch: "Veg Pulao, Raita", dinner: "Paneer Bhurji & Roti" },
      Saturday: { breakfast: "Bread & Jam", lunch: "Sambhar Rice", dinner: "Chicken Biryani" },
      Sunday: { breakfast: "Poori Bhaji", lunch: "Veg Thali", dinner: "Special Chicken Curry" }
    },
    roomTypes: [
      { type: "Single Sharing", desc: "Spacious room with study table, wardrobe, and attached bathroom." },
      { type: "Double Sharing", desc: "Shared room with two separate beds, wardrobes, and common study space." },
      { type: "Triple Sharing", desc: "Economical option with three beds, storage, and shared bathroom." }
    ],
    contact: { owner: "Aryan Kumar", phone: "+91 9310625964" },
    students: [
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan },
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan },
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan }
    ]
  },
  {
    id: 3,
    name: "Balaji PG",
    distance: "1.2 km ",
    price: "6.0K - 7.0K",
    sharing: "2 / 3 Sharing",
    rating: "4.5",
    foodType: "Vegetarian Only",
    amenities: ["Wi-Fi", "Laundry", "RO Water", "Parking"],
    image: balaji,
    images: { main: fab_main, img1: fab1, img2: fab2, img3: fab3, img4: fab4 },
    overview: { foodType: "Vegetarian", rent: "₹6,000 per month", distance: "1.2 km from college", sharing: "2 / 3 Sharing" },
    weeklyMenu: {
      Monday: { breakfast: "Idli & Sambar", lunch: "Dal, Rice, Roti, Veg Curry", dinner: "Paneer Butter Masala & Rice" },
      Tuesday: { breakfast: "Poha & Tea", lunch: "Rajma Chawal, Roti, Salad", dinner: "Aloo Curry & Rice" },
      Wednesday: { breakfast: "Paratha & Curd", lunch: "Chole, Rice, Roti", dinner: "Mix Veg & Chapati" },
      Thursday: { breakfast: "Upma & Tea", lunch: "Aloo Gobi, Dal, Rice", dinner: "Paneer Curry & Rice" },
      Friday: { breakfast: "Dosa & Chutney", lunch: "Vegetable Pulao & Raita", dinner: "Paneer Bhurji & Chapati" },
      Saturday: { breakfast: "Bread Omelette", lunch: "Sambhar Rice, Roti", dinner: "Veg Biryani" },
      Sunday: { breakfast: "Poori & Aloo Curry", lunch: "Veg Thali", dinner: "Paneer Tikka Masala" }
    },
    roomTypes: [
      { type: "Single Sharing", desc: "Spacious room with study table, wardrobe, and attached bathroom." },
      { type: "Double Sharing", desc: "Shared room with two separate beds, wardrobes, and common study space." },
      { type: "Triple Sharing", desc: "Economical option with three beds, storage, and shared bathroom." }
    ],
    contact: { owner: "Aryan Kumar", phone: "+91 9310625964" },
    students: [
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan },
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan },
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan }
    ]
  },
  {
    id: 4,
    name: "Shree Comfort",
    distance: "0.5 km ",
    price: "7.0K - 8.0K",
    sharing: "2 / 3 Sharing",
    rating: "4.7",
    foodType: "Vegetarian & Non-Vegetarian",
    amenities: ["Wi-Fi", "CCTV", "Laundry", "Non-Veg Allowed", "Housekeeping"],
    image: shree,
    images: { main: fab_main, img1: fab1, img2: fab2, img3: fab3, img4: fab4 },
    overview: { foodType: "Veg & Non-Veg", rent: "₹7,000 per month", distance: "0.5 km from college", sharing: "2 / 3 Sharing" },
    weeklyMenu: {
      Monday: { breakfast: "Upma & Tea", lunch: "Dal Fry, Rice, Roti", dinner: "Egg Curry & Rice" },
      Tuesday: { breakfast: "Paratha & Pickle", lunch: "Veg Kurma, Rice, Roti", dinner: "Chicken Curry & Rice" },
      Wednesday: { breakfast: "Idli & Sambhar", lunch: "Chana Masala, Rice", dinner: "Paneer Curry & Chapati" },
      Thursday: { breakfast: "Poha & Tea", lunch: "Rajma, Rice, Salad", dinner: "Fish Fry & Rice" },
      Friday: { breakfast: "Dosa & Chutney", lunch: "Veg Pulao, Raita", dinner: "Paneer Bhurji & Roti" },
      Saturday: { breakfast: "Bread & Jam", lunch: "Sambhar Rice", dinner: "Chicken Biryani" },
      Sunday: { breakfast: "Poori Bhaji", lunch: "Veg Thali", dinner: "Special Chicken Curry" }
    },
    roomTypes: [
      { type: "Single Sharing", desc: "Spacious room with study table, wardrobe, and attached bathroom." },
      { type: "Double Sharing", desc: "Shared room with two separate beds, wardrobes, and common study space." },
      { type: "Triple Sharing", desc: "Economical option with three beds, storage, and shared bathroom." }
    ],
    contact: { owner: "Aryan Kumar", phone: "+91 9310625964" },
    students: [
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan },
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan },
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan }
    ]
  },
  {
    id: 5,
    name: "Mathrushree",
    distance: "1.5 km ",
    price: "5.5K - 6.5K",
    sharing: "2 / 3 Sharing",
    rating: "4.3",
    foodType: "Vegetarian Only",
    amenities: ["Wi-Fi", "Laundry", "Power Backup", "Parking"],
    image: mathrushree,
    images: { main: fab_main, img1: fab1, img2: fab2, img3: fab3, img4: fab4 },
    overview: { foodType: "Vegetarian", rent: "₹5,500 per month", distance: "1.5 km from college", sharing: "2 / 3 Sharing" },
    weeklyMenu: {
      Monday: { breakfast: "Idli & Sambar", lunch: "Dal, Rice, Roti, Veg Curry", dinner: "Paneer Butter Masala & Rice" },
      Tuesday: { breakfast: "Poha & Tea", lunch: "Rajma Chawal, Roti, Salad", dinner: "Aloo Curry & Rice" },
      Wednesday: { breakfast: "Paratha & Curd", lunch: "Chole, Rice, Roti", dinner: "Mix Veg & Chapati" },
      Thursday: { breakfast: "Upma & Tea", lunch: "Aloo Gobi, Dal, Rice", dinner: "Paneer Curry & Rice" },
      Friday: { breakfast: "Dosa & Chutney", lunch: "Vegetable Pulao & Raita", dinner: "Paneer Bhurji & Chapati" },
      Saturday: { breakfast: "Bread Omelette", lunch: "Sambhar Rice, Roti", dinner: "Veg Biryani" },
      Sunday: { breakfast: "Poori & Aloo Curry", lunch: "Veg Thali", dinner: "Paneer Tikka Masala" }
    },
    roomTypes: [
      { type: "Single Sharing", desc: "Spacious room with study table, wardrobe, and attached bathroom." },
      { type: "Double Sharing", desc: "Shared room with two separate beds, wardrobes, and common study space." },
      { type: "Triple Sharing", desc: "Economical option with three beds, storage, and shared bathroom." }
    ],
    contact: { owner: "Aryan Kumar", phone: "+91 9310625964" },
    students: [
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan },
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan },
      { name: "Aryan Kumar", phone: "+91 9310625964", semester: "ISE 5th Sem", photo: aryan }
    ]
  }
];
