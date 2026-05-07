import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'single' | 'all'>('single');
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Load tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const saved = await AsyncStorage.getItem('tasks');
        if (saved) setTasks(JSON.parse(saved));
      } catch (e) {
        console.log(e);
      }
    };
    loadTasks();
  }, []);

  // Save tasks
  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (e) {
      console.log(e);
    }
  };

  const addTask = () => {
    if (!input.trim()) {
      setShowErrorModal(true);
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: input.trim(),
      completed: false,
    };

    saveTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    setDeleteTaskId(id);
    setDeleteType('single');
    setShowDeleteModal(true);
  };

  const markAllComplete = () => {
    const updated = tasks.map(task => ({ ...task, completed: true }));
    saveTasks(updated);
  };

  const deleteCompleted = () => {
    setDeleteType('all');
    setShowDeleteModal(true);
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  const handleConfirmDelete = () => {
    if (deleteType === 'single' && deleteTaskId) {
      const filtered = tasks.filter(t => t.id !== deleteTaskId);
      saveTasks(filtered);
    } else if (deleteType === 'all') {
      const remaining = tasks.filter(t => !t.completed);
      saveTasks(remaining);
    }
    setShowDeleteModal(false);
    setDeleteTaskId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteTaskId(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fa' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />

      <ScrollView style={{ flex: 1 }} scrollEnabled={true}>
        <View style={{ paddingHorizontal: 20, paddingTop: 32, paddingBottom: 40 }}>
          
          {/* Hero Header */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#1a1a1a', letterSpacing: -0.5 }}>
              My Tasks
            </Text>
            <Text style={{ fontSize: 14, color: '#888', marginTop: 8, fontWeight: '500' }}>
              Organize your day and boost productivity
            </Text>
          </View>

          {/* Statistics Cards - Premium Style */}
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 28 }}>
            <View style={{ flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#6366f1', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 }}>
              <Text style={{ fontSize: 12, color: '#888', fontWeight: '600', marginBottom: 8 }}>TOTAL TASKS</Text>
              <Text style={{ fontSize: 28, fontWeight: '800', color: '#1a1a1a' }}>{total}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#10b981', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 }}>
              <Text style={{ fontSize: 12, color: '#888', fontWeight: '600', marginBottom: 8 }}>COMPLETED</Text>
              <Text style={{ fontSize: 28, fontWeight: '800', color: '#10b981' }}>{completed}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#f59e0b', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 }}>
              <Text style={{ fontSize: 12, color: '#888', fontWeight: '600', marginBottom: 8 }}>PENDING</Text>
              <Text style={{ fontSize: 28, fontWeight: '800', color: '#f59e0b' }}>{pending}</Text>
            </View>
          </View>

          {/* Add Task Input - Premium Style */}
          <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 14, borderWidth: 2, borderColor: '#e5e7eb', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
              <MaterialIcons name="edit" size={20} color="#6366f1" />
              <TextInput
                style={{ flex: 1, fontSize: 15, color: '#1a1a1a', fontWeight: '500' }}
                placeholder="Add a new task..."
                placeholderTextColor="#ccc"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={addTask}
              />
              <TouchableOpacity style={{ backgroundColor: '#6366f1', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={addTask}>
                <MaterialIcons name="add" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          {total > 0 && (
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
              <TouchableOpacity
                style={{ flex: 1, paddingVertical: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ecfdf5', borderWidth: 2, borderColor: '#10b981' }}
                onPress={markAllComplete}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <MaterialIcons name="check-circle" size={18} color="#10b981" />
                  <Text style={{ fontWeight: '700', fontSize: 13, color: '#10b981' }}>Mark All</Text>
                </View>
              </TouchableOpacity>
              {completed > 0 && (
                <TouchableOpacity
                  style={{ flex: 1, paddingVertical: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fef2f2', borderWidth: 2, borderColor: '#ef4444' }}
                  onPress={deleteCompleted}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <MaterialIcons name="delete-sweep" size={18} color="#ef4444" />
                    <Text style={{ fontWeight: '700', fontSize: 13, color: '#ef4444' }}>Clear</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Task List or Empty State */}
          {total === 0 ? (
            <View style={{ marginTop: 60, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: 80, height: 80, backgroundColor: '#f3f4f6', borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 40 }}>📝</Text>
              </View>
              <Text style={{ fontSize: 20, fontWeight: '800', color: '#1a1a1a', marginBottom: 8 }}>No Tasks Yet</Text>
              <Text style={{ fontSize: 14, color: '#888', textAlign: 'center', maxWidth: 280 }}>
                Create your first task above and start organizing your day
              </Text>
            </View>
          ) : (
            <View style={{ gap: 10, marginBottom: 20 }}>
              {tasks.map((item) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: 16,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: item.completed ? '#e5e7eb' : '#f3f4f6',
                    shadowColor: '#000',
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 1,
                    opacity: item.completed ? 0.65 : 1,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      borderWidth: 2.5,
                      borderColor: item.completed ? '#10b981' : '#d1d5db',
                      backgroundColor: item.completed ? '#10b981' : 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 14,
                    }}
                    onPress={() => toggleTask(item.id)}
                  >
                    {item.completed && <MaterialIcons name="check" size={16} color="white" />}
                  </TouchableOpacity>

                  <Text
                    style={{
                      flex: 1,
                      fontSize: 15,
                      fontWeight: '600',
                      color: item.completed ? '#999' : '#1a1a1a',
                      textDecorationLine: item.completed ? 'line-through' : 'none',
                    }}
                  >
                    {item.title}
                  </Text>

                  <TouchableOpacity
                    onPress={() => deleteTask(item.id)}
                    style={{ padding: 8 }}
                  >
                    <MaterialIcons name="close" size={22} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 28, width: '85%', maxWidth: 340, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 16, elevation: 12 }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <View style={{ width: 60, height: 60, backgroundColor: '#fef2f2', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                <MaterialIcons name="warning" size={32} color="#ef4444" />
              </View>
            </View>

            <Text style={{ fontSize: 18, fontWeight: '800', color: '#1a1a1a', marginBottom: 10, textAlign: 'center' }}>
              {deleteType === 'single' ? 'Delete Task?' : 'Clear Completed?'}
            </Text>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 28, textAlign: 'center', lineHeight: 20 }}>
              {deleteType === 'single' ? 'This action cannot be undone.' : 'All completed tasks will be removed permanently.'}
            </Text>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                style={{ flex: 1, paddingVertical: 12, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6', borderWidth: 1.5, borderColor: '#e5e7eb' }}
                onPress={handleCancelDelete}
              >
                <Text style={{ fontWeight: '700', fontSize: 15, color: '#1a1a1a' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, paddingVertical: 12, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ef4444', borderWidth: 1.5, borderColor: '#ef4444' }}
                onPress={handleConfirmDelete}
              >
                <Text style={{ fontWeight: '700', fontSize: 15, color: '#fff' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Error Notification Modal */}
      {showErrorModal && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 28, width: '85%', maxWidth: 340, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 16, elevation: 12 }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <View style={{ width: 60, height: 60, backgroundColor: '#fef3f2', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                <MaterialIcons name="info" size={32} color="#f59e0b" />
              </View>
            </View>

            <Text style={{ fontSize: 18, fontWeight: '800', color: '#1a1a1a', marginBottom: 10, textAlign: 'center' }}>
              Oops!
            </Text>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 28, textAlign: 'center', lineHeight: 20 }}>
              Please enter a task before adding it.
            </Text>

            <TouchableOpacity
              style={{ paddingVertical: 12, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f59e0b' }}
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={{ fontWeight: '700', fontSize: 15, color: '#fff' }}>Got It</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
