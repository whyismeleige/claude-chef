const SERVER_URL = "http://localhost:5000";

export async function getRecipeFromChefClaude(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(",");

  const response = await fetch(`${SERVER_URL}/claude`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ingredientsString}),
  });
  const data = await response.json();
  return data.content[0].text;
}
