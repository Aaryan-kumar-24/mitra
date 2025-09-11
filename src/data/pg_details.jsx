import fab1 from "./image/fab1.jpg";
import fab2 from "./image/fab2.jpg";
import fab3 from "./image/fab3.jpg";
import fab4 from "./image/fab4.jpg";
import fab_main from "./image/fab_main.jpg";
import aryan from "./image/aryan.jpg";
import fab_location from "./image/fab_location.jpg";

export const pgList = [
  {
    "id": 1,
    "name": "Fab Hostels",
    "distance": "1 km from college",
    "rent": "₹7,500 - ₹8,500",
    "foodType": "Vegetarian Only",
    "sharingOptions": ["Double", "Triple"],
    "overview": {
      "foodType": "Vegetarian",
      "rent": "₹7,500 per month",
      "distance": "1 km from college",
      "sharing": "2 / 3 Sharing"
    },
    "images": {
      "main": fab_main,
      "img1": fab1,
      "img2": fab2,
      "img3": fab3,
      "img4": fab4
    },
    "weeklyMenu": {
      "Monday": { "breakfast": "Idli & Sambar", "lunch": "Dal, Rice, Roti, Veg Curry", "dinner": "Paneer Butter Masala & Rice" },
      "Tuesday": { "breakfast": "Poha & Tea", "lunch": "Rajma Chawal, Roti, Salad", "dinner": "Aloo Curry & Rice" },
      "Wednesday": { "breakfast": "Paratha & Curd", "lunch": "Chole, Rice, Roti", "dinner": "Mix Veg & Chapati" },
      "Thursday": { "breakfast": "Upma & Tea", "lunch": "Aloo Gobi, Dal, Rice", "dinner": "Paneer Curry & Rice" },
      "Friday": { "breakfast": "Dosa & Chutney", "lunch": "Vegetable Pulao & Raita", "dinner": "Paneer Bhurji & Chapati" },
      "Saturday": { "breakfast": "Bread Omelette", "lunch": "Sambhar Rice, Roti", "dinner": "Veg Biryani" },
      "Sunday": { "breakfast": "Poori & Aloo Curry", "lunch": "Veg Thali", "dinner": "Paneer Tikka Masala" }
    },
    "amenities": ["Wi-Fi", "Laundry", "24/7 Water", "Power Backup", "Attached Bathroom", "Housekeeping", "RO Drinking Water", "Parking"],
    "roomTypes": [
      { "type": "Single Sharing", "desc": "Spacious room with study table, wardrobe, and attached bathroom." },
      { "type": "Double Sharing", "desc": "Shared room with two separate beds, wardrobes, and common study space." },
      { "type": "Triple Sharing", "desc": "Economical option with three beds, storage, and shared bathroom." }
    ],
    "contact": { "owner": "Aryan Kumar", "phone": "+91 9310625964" },
    "students": [
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" },
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" },
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" }
    ],
    "locationImage": "fab_location"
  },
  {
    "id": 2,
    "name": "Pupils Nest",
    "distance": "0.8 km from college",
    "rent": "₹6,500 - ₹7,500",
    "foodType": "Vegetarian & Non-Vegetarian",
    "sharingOptions": ["Double", "Triple"],
    "overview": {
      "foodType": "Vegetarian & Non-Vegetarian",
      "rent": "₹6,500 per month",
      "distance": "0.8 km from college",
      "sharing": "2 / 3 Sharing"
    },
    "images": {
      "main": fab_main,
      "img1": fab1,
      "img2": fab2,
      "img3": fab3,
      "img4": fab4
    },
    "weeklyMenu": {
      "Monday": { "breakfast": "Upma & Tea", "lunch": "Dal Fry, Rice, Roti", "dinner": "Egg Curry & Rice" },
      "Tuesday": { "breakfast": "Paratha & Pickle", "lunch": "Veg Kurma, Rice, Roti", "dinner": "Chicken Curry & Rice" },
      "Wednesday": { "breakfast": "Idli & Sambhar", "lunch": "Chana Masala, Rice", "dinner": "Paneer Curry & Chapati" },
      "Thursday": { "breakfast": "Poha & Tea", "lunch": "Rajma, Rice, Salad", "dinner": "Fish Fry & Rice" },
      "Friday": { "breakfast": "Dosa & Chutney", "lunch": "Veg Pulao, Raita", "dinner": "Paneer Bhurji & Roti" },
      "Saturday": { "breakfast": "Bread & Jam", "lunch": "Sambhar Rice", "dinner": "Chicken Biryani" },
      "Sunday": { "breakfast": "Poori Bhaji", "lunch": "Veg Thali", "dinner": "Special Chicken Curry" }
    },
    "amenities": ["Wi-Fi", "Laundry", "Non-Veg Allowed", "CCTV", "Parking"],
    "roomTypes": [
      { "type": "Single Sharing", "desc": "Spacious room with study table, wardrobe, and attached bathroom." },
      { "type": "Double Sharing", "desc": "Shared room with two separate beds, wardrobes, and common study space." },
      { "type": "Triple Sharing", "desc": "Economical option with three beds, storage, and shared bathroom." }
    ],
    "contact": { "owner": "Aryan Kumar", "phone": "+91 9310625964" },
    "students": [
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" },
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" },
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" }
    ],
    "locationImage": "pupils_location"
  },
  {
    "id": 3,
    "name": "Balaji PG",
    "distance": "1.2 km from college",
    "rent": "₹7,000 - ₹8,000",
    "foodType": "Vegetarian Only",
    "sharingOptions": ["Double"],
    "overview": {
      "foodType": "Vegetarian",
      "rent": "₹7,000 per month",
      "distance": "1.2 km from college",
      "sharing": "2 Sharing"
    },
    "images": {
      "main": fab_main,
      "img1": fab1,
      "img2": fab2,
      "img3": fab3,
      "img4": fab4
    },
    "weeklyMenu": {
      "Monday": { "breakfast": "Upma & Tea", "lunch": "Dal, Rice, Chapati", "dinner": "Paneer Butter Masala" },
      "Tuesday": { "breakfast": "Idli & Sambhar", "lunch": "Veg Kurma & Rice", "dinner": "Mix Veg & Chapati" },
      "Wednesday": { "breakfast": "Paratha & Curd", "lunch": "Chole Chawal", "dinner": "Dal Fry & Roti" },
      "Thursday": { "breakfast": "Poha & Tea", "lunch": "Veg Curry & Rice", "dinner": "Paneer Bhurji & Rice" },
      "Friday": { "breakfast": "Dosa & Chutney", "lunch": "Veg Pulao", "dinner": "Veg Kofta Curry" },
      "Saturday": { "breakfast": "Bread Butter", "lunch": "Dal Rice", "dinner": "Veg Biryani" },
      "Sunday": { "breakfast": "Poori Aloo", "lunch": "Veg Thali", "dinner": "Paneer Tikka" }
    },
    "amenities": ["Wi-Fi", "CCTV", "Parking", "Laundry"],
    "roomTypes": [
      { "type": "Single Sharing", "desc": "Spacious room with study table, wardrobe, and attached bathroom." },
      { "type": "Double Sharing", "desc": "Shared room with two separate beds, wardrobes, and common study space." },
      { "type": "Triple Sharing", "desc": "Economical option with three beds, storage, and shared bathroom." }
    ],
    "contact": { "owner": "Aryan Kumar", "phone": "+91 9310625964" },
    "students": [
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" },
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" },
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" }
    ],
    "locationImage": "balaji_location"
  },
  {
    "id": 4,
    "name": "Shree Comfort",
    "distance": "0.5 km from college",
    "rent": "₹8,000 - ₹9,000",
    "foodType": "Vegetarian Only",
    "sharingOptions": ["Double", "Triple"],
    "overview": {
      "foodType": "Vegetarian",
      "rent": "₹8,000 per month",
      "distance": "0.5 km from college",
      "sharing": "2 / 3 Sharing"
    },
    "images": {
      "main": fab_main,
      "img1": fab1,
      "img2": fab2,
      "img3": fab3,
      "img4": fab4
    },
    "weeklyMenu": {
      "Monday": { "breakfast": "Idli & Sambhar", "lunch": "Dal Tadka & Rice", "dinner": "Paneer Curry" },
      "Tuesday": { "breakfast": "Poha", "lunch": "Rajma Rice", "dinner": "Mix Veg & Chapati" },
      "Wednesday": { "breakfast": "Paratha & Curd", "lunch": "Veg Curry & Rice", "dinner": "Dal Fry & Roti" },
      "Thursday": { "breakfast": "Upma", "lunch": "Aloo Gobi & Rice", "dinner": "Paneer Butter Masala" },
      "Friday": { "breakfast": "Dosa", "lunch": "Veg Pulao", "dinner": "Kofta Curry & Roti" },
      "Saturday": { "breakfast": "Bread Omelette", "lunch": "Sambhar Rice", "dinner": "Veg Biryani" },
      "Sunday": { "breakfast": "Poori Aloo", "lunch": "Veg Thali", "dinner": "Paneer Tikka" }
    },
    "amenities": ["Wi-Fi", "Laundry", "24x7 Water", "CCTV"],
    "roomTypes": [
      { "type": "Single Sharing", "desc": "Spacious room with study table, wardrobe, and attached bathroom." },
      { "type": "Double Sharing", "desc": "Shared room with two separate beds, wardrobes, and common study space." },
      { "type": "Triple Sharing", "desc": "Economical option with three beds, storage, and shared bathroom." }
    ],
    "contact": { "owner": "Aryan Kumar", "phone": "+91 9310625964" },
    "students": [
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" },
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" },
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" }
    ],
    "locationImage": "shree_location"
  },
  {
    "id": 5,
    "name": "Mathrushree",
    "distance": "1.5 km from college",
    "rent": "₹6,000 - ₹7,000",
    "foodType": "Vegetarian & Non-Vegetarian",
    "sharingOptions": ["Triple"],
    "overview": {
      "foodType": "Vegetarian & Non-Vegetarian",
      "rent": "₹6,000 per month",
      "distance": "1.5 km from college",
      "sharing": "3 Sharing"
    },
    "images": {
      "main": fab_main,
      "img1": fab1,
      "img2": fab2,
      "img3": fab3,
      "img4": fab4
    },
    "weeklyMenu": {
      "Monday": { "breakfast": "Upma & Tea", "lunch": "Dal Rice", "dinner": "Chicken Curry & Rice" },
      "Tuesday": { "breakfast": "Paratha", "lunch": "Veg Kurma", "dinner": "Paneer Bhurji" },
      "Wednesday": { "breakfast": "Idli & Sambhar", "lunch": "Rajma Rice", "dinner": "Fish Curry" },
      "Thursday": { "breakfast": "Poha & Tea", "lunch": "Chana Masala", "dinner": "Veg Curry & Chapati" },
      "Friday": { "breakfast": "Dosa", "lunch": "Veg Pulao", "dinner": "Chicken Fry" },
      "Saturday": { "breakfast": "Bread Butter", "lunch": "Sambhar Rice", "dinner": "Veg Biryani" },
      "Sunday": { "breakfast": "Poori Aloo", "lunch": "Veg Thali", "dinner": "Paneer Tikka" }
    },
    "amenities": ["Wi-Fi", "Laundry", "Food Included", "CCTV"],
    "roomTypes": [
      { "type": "Single Sharing", "desc": "Spacious room with study table, wardrobe, and attached bathroom." },
      { "type": "Double Sharing", "desc": "Shared room with two separate beds, wardrobes, and common study space." },
      { "type": "Triple Sharing", "desc": "Economical option with three beds, storage, and shared bathroom." }
    ],
    "contact": { "owner": "Aryan Kumar", "phone": "+91 9310625964" },
    "students": [
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" },
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" },
      { "name": "Aryan Kumar", "phone": "+91 9310625964", "semester": "ISE 5th Sem" }
    ],
    "locationImage": "mathrushree_location"
  }
];
