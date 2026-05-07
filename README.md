# 📝 TodoApp - React Native Expo

A beautiful, professional Todo application built with React Native Expo, featuring a modern UI design and complete task management functionality.

![TodoApp Preview](https://via.placeholder.com/800x400/6366f1/ffffff?text=TodoApp+Preview)

## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Create new tasks with validation
- ✅ **Complete Tasks** - Mark tasks as done with visual feedback
- ✅ **Delete Tasks** - Remove individual tasks with confirmation
- ✅ **Bulk Actions** - Mark all complete or clear completed tasks
- ✅ **Data Persistence** - Tasks saved locally using AsyncStorage

### User Interface
- 🎨 **Modern Design** - Professional UI with indigo color scheme
- 📱 **Responsive Layout** - Works on mobile and web platforms
- 📊 **Statistics Dashboard** - Real-time task counts (Total, Done, Pending)
- 🎯 **Empty State** - Friendly messaging when no tasks exist
- 🔄 **Smooth Animations** - Professional transitions and feedback

### User Experience
- 🚫 **Input Validation** - Prevents empty task creation
- 💬 **In-App Notifications** - Custom modals instead of browser alerts
- 🎨 **Visual Feedback** - Strikethrough and opacity for completed tasks
- 📱 **Touch-Friendly** - Large touch targets and intuitive controls

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/DOMS6996/To-Do-App.git
   cd To-Do-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install required packages** (if not included)
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on your device**
   - **Web**: Press `w` in terminal or open in browser
   - **iOS**: Press `i` (requires Xcode and iOS Simulator)
   - **Android**: Press `a` (requires Android Studio and emulator)

## 📱 Usage

### Adding Tasks
1. Type your task in the input field
2. Press the **+** button or hit Enter
3. Task appears in the list below

### Managing Tasks
- **Complete**: Tap the checkbox next to any task
- **Delete**: Tap the trash icon (X) next to a task
- **Bulk Actions**: Use "Mark All" or "Clear" buttons when available

### Viewing Statistics
- **Total**: All tasks created
- **Done**: Completed tasks (green)
- **Pending**: Incomplete tasks (orange)

## 🛠️ Technical Details

### Built With
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **AsyncStorage** - Local data persistence
- **Expo Vector Icons** - Icon library

### Project Structure
```
todo-app/
├── app/
│   ├── _layout.tsx          # Root layout and navigation
│   ├── (tabs)/
│   │   ├── index.tsx        # Main TodoApp screen
│   │   ├── explore.tsx      # Explore tab (default)
│   │   └── _layout.tsx      # Tab navigation
│   └── modal.tsx            # Modal screen
├── components/              # Reusable components
├── constants/               # App constants
├── hooks/                   # Custom hooks
├── assets/                  # Images and media
├── global.css               # Global styles
├── tailwind.config.js       # Tailwind configuration
├── app.json                 # Expo configuration
└── package.json             # Dependencies and scripts
```

### Key Components
- **TodoApp** (`app/(tabs)/index.tsx`) - Main application logic
- **Statistics Cards** - Real-time task counters
- **Task Items** - Individual task components with actions
- **Custom Modals** - In-app confirmation dialogs

## 🎯 Requirements Met

This TodoApp fulfills all specified requirements:

- ✅ Task List Screen with scrollable list
- ✅ Task items showing title, checkbox, delete icon
- ✅ Visual distinction for completed tasks
- ✅ Add new task with input field and button
- ✅ Prevent empty task creation
- ✅ Toggle task completion
- ✅ Delete individual tasks with confirmation
- ✅ Mark all tasks complete
- ✅ Delete all completed tasks
- ✅ Task statistics panel (Total, Done, Pending)
- ✅ Empty state with friendly message
- ✅ Flexible, responsive sizing (no hardcoded pixels)
- ✅ Android-style confirmation dialogs

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using React Native Expo**
