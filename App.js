import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task != null) {
      Keyboard.dismiss();
      setTasks([...tasks, task]);
      setTask(null);
    }
  };

  const completeTask = (index) => {
    Vibration.vibrate();
    let itemsCopy = [...tasks];
    itemsCopy.splice(index, 1);
    setTasks(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Today's Tasks*/}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <View style={styles.tasks}>
          {tasks.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onLongPress={() => completeTask(index)}
              >
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Add a task*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.addTaskWrapper}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Add a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addTask}>
            <Text style={styles.button}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    // alignItems: "center",
    // justifyContent: "center",
  },
  tasksWrapper: {
    paddingTop: 60,

    paddingHorizontal: 20,
  },
  sectionTitle: { fontSize: 24, fontWeight: "bold" },
  tasks: {
    marginTop: 25,
  },
  addTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textInput: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addTask: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addButton: {},
});
