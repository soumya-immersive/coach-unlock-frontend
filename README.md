### **1. Overview**

This is the **React.js frontend** for the Coach Unlock App:

* Displays users and their tokens/XP
* Lists coaches
* Unlocks coaches
* Handles red flag warnings

---

### **2. Prerequisites**

* **Node.js** v18+
* **npm**

---

### **3. Setup & Installation**

#### **Step 1 – Clone the repository**

```bash
git clone <your-frontend-repo-url>
cd frontend
```

#### **Step 2 – Install dependencies**

```bash
npm install
```

#### **Step 3 – Configure API base URL**

Edit **`src/api.js`**:

```javascript
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:4000/api'
});
```

#### **Step 4 – Start frontend**

```bash
npm start
```

Frontend runs at:
**`http://localhost:3000`**

---
