import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    setCourseGoals((courseGoals) => [
      ...courseGoals,
      { id: Math.random().toString(), value: enteredGoal },
    ]);
    setEnteredGoal("");
  };

  return (
    <View style={styles.screen}>
      <GoalInput
        goalInputHandler={goalInputHandler}
        addGoalHandler={addGoalHandler}
        enteredGoal={enteredGoal}
      />
      <FlatList
        data={courseGoals}
        renderItem={(item) => <GoalItem title={item.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
