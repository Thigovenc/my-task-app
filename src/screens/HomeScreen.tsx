import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Task } from "../types/Task";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (!input.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: input.trim(),
      done: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setInput("");
  };

  const toggleTaskDone = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    if (!id) return;
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua tarefa"
          value={input}
          onChangeText={setInput}
        />
        <Button title="Adicionar" onPress={handleAddTask} />
      </View>

      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.task}>
              <TouchableOpacity onPress={() => toggleTaskDone(item.id)}>
                <Text style={item.done ? styles.taskDone : styles.taskText}>
                  {item.title}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Text style={{ color: "red" }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhuma tarefa adicionada ainda.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
  task: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskText: {
    fontSize: 16,
  },
  taskDone: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});
