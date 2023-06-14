import React from "react";

const CommonWords = ["the", "and", "a", "an", "in", "on"];

class TextAnalyzer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token") || null,
      text: "",
      wordCount: 0,
      wordCountExcludingCommon: 0,
      differentWordCount: 0,
      differentWordsExcludingCommon: [],
      paragraphCount: 0,
      sentenceCount: 0,
      wordsPerSentence: 0,
      hardWordsCount: 0,
      longWordsCount: 0,
      charactersPerWord: 0,
      readingTime: 0,
      speakingTime: 0,
      phraseDensity: 0,
    };
  }

  handleChange = (event) => {
    const text = event.target.value;
    this.setState({ text }, () => {
      this.analyzeText();
    });
  };

  analyzeText = () => {
    const { text } = this.state;

    // Word Count
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;

    // Word Count (Excluding Common Words)
    const wordCountExcludingCommon = words.filter(
      (word) => !CommonWords.includes(word)
    ).length;

    // Number of Different Words
    const differentWords = [...new Set(words)];
    const differentWordCount = differentWords.length;

    // Different Words (Excluding Common Words)
    const differentWordsExcludingCommon = differentWords.filter(
      (word) => !CommonWords.includes(word)
    );

    // Number of Paragraphs
    const paragraphCount = text
      .trim()
      .split("\n")
      .filter((para) => para !== "").length;

    // Number of Sentences
    const sentenceCount = text
      .trim()
      .split(/[.!?]+/)
      .filter((sentence) => sentence !== "").length;

    // Words per Sentence
    const wordsPerSentence = wordCount / sentenceCount;

    // Hard Words
    const hardWordsCount = words.filter((word) => this.isHardWord(word)).length;

    // Long Words
    const longWordsCount = words.filter((word) => this.isLongWord(word)).length;

    // Characters per Word
    const totalCharacters = words.join("").length;
    const charactersPerWord = totalCharacters / wordCount;

    // Estimated Reading Time (Assuming 200 words per minute)
    const readingTime = wordCount / 200;

    // Estimated Speaking Time (Assuming 150 words per minute)
    const speakingTime = wordCount / 150;

    // Phrase Density
    const phraseDensity = wordCount / sentenceCount;

    this.setState({
      wordCount,
      wordCountExcludingCommon,
      differentWordCount,
      differentWordsExcludingCommon,
      paragraphCount,
      sentenceCount,
      wordsPerSentence,
      hardWordsCount,
      longWordsCount,
      charactersPerWord,
      readingTime,
      speakingTime,
      phraseDensity,
    });
  };

  isHardWord = (word) => {
    // Add your own logic to determine hard words
    // This is just a basic example
    return word.length >= 6;
  };

  isLongWord = (word) => {
    // Add your own logic to determine long words
    // This is just a basic example
    return word.length >= 10;
  };

  render() {
    const {
      token,
      text,
      wordCount,
      wordCountExcludingCommon,
      differentWordCount,
      differentWordsExcludingCommon,
      paragraphCount,
      sentenceCount,
      wordsPerSentence,
      hardWordsCount,
      longWordsCount,
      charactersPerWord,
      readingTime,
      speakingTime,
      phraseDensity,
    } = this.state;

    return (
      <>
        {token !== null ? (
          <>
            <ul className="pt-1 px-0">
              <li>
                <h6>Enter your text (e.g. small paragraph)</h6>
                <textarea
                  className="form-control"
                  value={text}
                  onChange={this.handleChange}
                  rows="3"
                ></textarea>
              </li>
            </ul>
            <div className="d-flex ">
              <table className="table table-striped">
                <thead>
                <tr >
                  <td>
                    <h3>Text Analysis Results:</h3>
                  </td>
                </tr>
                </thead>
                <tbody>
                <tr >
                  <td>
                    <p>Total Word Count: </p>
                  </td>
                  <td>{wordCount}</td>
                </tr>
                <tr >
                  <td>
                    <p>
                      Word Count (Excluding Common Words):{" "}
                     
                    </p>
                  </td>
                  <td> {wordCountExcludingCommon}</td>
                </tr>
                <tr >
                  <td>
                    <p>Number of Different Words: </p>
                  </td><td>{differentWordCount}</td>
                </tr>
                <tr >
                  <td>
                    <p>
                      Different Words (Excluding Common Words):
                    </p>
                  </td>
                  <td>{" "}
                      {differentWordsExcludingCommon.join(", ")}</td>
                </tr>
                <tr >
                  <td>
                    <p>Number of Paragraphs: </p>
                  </td>
                  <td>{paragraphCount}</td>
                </tr>
                <tr >
                  <td>
                    <p>Number of Sentences: </p>
                  </td>
                  <td>{sentenceCount}</td>
                </tr>
                <tr >
                  <td>
                    <p>Words per Sentence: </p>
                  </td>
                  <td>{wordsPerSentence}</td>
                </tr>
                <tr >
                  <td>
                    <p>Hard Words (?): </p>
                  </td>
                  <td>{hardWordsCount}</td>
                </tr>
                <tr >
                  <td>
                    <p>Long Words (?): </p>
                  </td><td>
                  {longWordsCount}
                  </td>
                </tr>
                <tr >
                  <td>
                    <p>Characters per word: </p>
                  </td>
                  <td>{charactersPerWord}</td>
                </tr>
                <tr >
                  <td>
                    <p>
                      Estimated Reading Time: 
                    </p>
                  </td>
                  <td>{readingTime.toFixed(2)} minutes</td>
                </tr>
                <tr >
                  <td>
                    <p>
                      Estimated Speaking Time: 
                    </p>
                  </td>
                  <td>{speakingTime.toFixed(2)} minutes</td>
                </tr>
                <tr >
                  <td>
                    <p>Phrase Density: </p>
                  </td>
                  <td>{phraseDensity}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h3>Not Authorized</h3>
        )}
      </>
    );
  }
}

export default TextAnalyzer;
