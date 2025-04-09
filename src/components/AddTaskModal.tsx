import React, { useState } from "react";
import { Modal, View, TextInput, Button, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
};

export const AddTaskModal: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title);
      setTitle("");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TextInput
            placeholder="Título da tarefa"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <Button title="Adicionar" onPress={handleAdd} />
          <Button title="Cancelar" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 8,
    gap: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
});
