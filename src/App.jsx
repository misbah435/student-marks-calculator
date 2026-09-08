import { useState } from "react";
import "./App.css";

const subjects = [
  "Mathematics",
  "Java Programming",
  "Database Management",
  "Web Development",
  "Computer Networks",
];

function App() {
  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    course: "",
  });

  const [marks, setMarks] = useState(
    subjects.reduce((acc, subject) => {
      acc[subject] = {
        internal: "",
        external: "",
      };
      return acc;
    }, {})
  );

  const [result, setResult] = useState(null);

  const handleStudentChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleMarksChange = (subject, type, value) => {
    if (
      value === "" ||
      (/^\d{0,2}$/.test(value) && Number(value) <= 100)
    ) {
      setMarks({
        ...marks,
        [subject]: {
          ...marks[subject],
          [type]: value,
        },
      });
    }
  };

  const calculateResult = () => {
    if (!student.name || !student.rollNo || !student.course) {
      alert("Please enter all student details.");
      return;
    }

    for (const subject of subjects) {
      if (
        marks[subject].internal === "" ||
        marks[subject].external === ""
      ) {
        alert(`Please enter marks for ${subject}.`);
        return;
      }

      if (
        Number(marks[subject].internal) > 30 ||
        Number(marks[subject].external) > 70
      ) {
        alert(
          `${subject}: Internal marks must be ≤ 30 and External marks must be ≤ 70.`
        );
        return;
      }
    }

    const subjectResults = subjects.map((subject) => {
      const internal = Number(marks[subject].internal);
      const external = Number(marks[subject].external);
      const total = internal + external;

      return {
        subject,
        internal,
        external,
        total,
      };
    });

    const totalMarks = subjectResults.reduce(
      (sum, subject) => sum + subject.total,
      0
    );

    const maxMarks = subjects.length * 100;

    const percentage = (totalMarks / maxMarks) * 100;

    const passed = subjectResults.every(
      (subject) => subject.total >= 40
    );

    setResult({
      subjectResults,
      totalMarks,
      maxMarks,
      percentage,
      passed,
    });

    setTimeout(() => {
      document
        .getElementById("result")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  const resetForm = () => {
    setStudent({
      name: "",
      rollNo: "",
      course: "",
    });

    setMarks(
      subjects.reduce((acc, subject) => {
        acc[subject] = {
          internal: "",
          external: "",
        };
        return acc;
      }, {})
    );

    setResult(null);
  };

  return (
    <div className="app">

      <div className="background-orb orb-one"></div>
      <div className="background-orb orb-two"></div>

      {/* HEADER */}
      <header className="header">

        <div className="logo">
          <span>✦</span>
          Markly
        </div>

        <div className="student-id">
          <strong>Misbah Shaikh</strong>
          <span>PRN: 12414009</span>
        </div>

      </header>

      <main className="container">

        {/* HERO SECTION */}
        <section className="hero">

          <div className="hero-text">

            <p className="eyebrow">
              ACADEMIC PERFORMANCE
            </p>

            <h1>
              Student Marks
              <span> Calculator</span>
            </h1>

            <p className="hero-description">
              Enter student details and subject marks to
              instantly calculate total marks, percentage,
              and overall result.
            </p>

          </div>

          <div className="hero-icon">
            <div className="icon-circle">
              📊
            </div>
          </div>

        </section>

        {/* STUDENT INFORMATION */}
        <section className="card">

          <div className="section-heading">

            <div className="section-number">
              01
            </div>

            <div>
              <h2>Student Information</h2>

              <p>
                Enter the basic details of the student.
              </p>
            </div>

          </div>

          <div className="student-grid">

            <div className="input-group">

              <label>
                Student Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={student.name}
                onChange={handleStudentChange}
              />

            </div>

            <div className="input-group">

              <label>
                Roll Number
              </label>

              <input
                type="text"
                name="rollNo"
                placeholder="e.g. 12414009"
                value={student.rollNo}
                onChange={handleStudentChange}
              />

            </div>

            <div className="input-group full-width">

              <label>
                Course / Class
              </label>

              <input
                type="text"
                name="course"
                placeholder="e.g. B.Tech Computer Science"
                value={student.course}
                onChange={handleStudentChange}
              />

            </div>

          </div>

        </section>

        {/* SUBJECT MARKS */}
        <section className="card">

          <div className="section-heading">

            <div className="section-number">
              02
            </div>

            <div>

              <h2>
                Subject Marks
              </h2>

              <p>
                Internal marks are out of 30 and
                external marks are out of 70.
              </p>

            </div>

          </div>

          <div className="subject-list">

            {subjects.map((subject, index) => (

              <div
                className="subject-card"
                key={subject}
              >

                <div className="subject-info">

                  <div className="subject-icon">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>

                    <h3>
                      {subject}
                    </h3>

                    <span>
                      Maximum: 100 marks
                    </span>

                  </div>

                </div>

                <div className="marks-inputs">

                  <div className="mark-input">

                    <label>
                      Internal
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="30"
                      placeholder="00"
                      value={marks[subject].internal}
                      onChange={(e) =>
                        handleMarksChange(
                          subject,
                          "internal",
                          e.target.value
                        )
                      }
                    />

                    <small>
                      / 30
                    </small>

                  </div>

                  <div className="plus">
                    +
                  </div>

                  <div className="mark-input">

                    <label>
                      External
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="70"
                      placeholder="00"
                      value={marks[subject].external}
                      onChange={(e) =>
                        handleMarksChange(
                          subject,
                          "external",
                          e.target.value
                        )
                      }
                    />

                    <small>
                      / 70
                    </small>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* BUTTONS */}
        <div className="action-area">

          <button
            className="calculate-btn"
            onClick={calculateResult}
          >

            <span>
              Calculate Result
            </span>

            <span className="arrow">
              →
            </span>

          </button>

          <button
            className="reset-btn"
            onClick={resetForm}
          >
            Reset
          </button>

        </div>

        {/* RESULT */}
        {result && (

          <section
            className="result-card"
            id="result"
          >

            <div className="result-header">

              <div>

                <p className="eyebrow">
                  FINAL REPORT
                </p>

                <h2>
                  Performance Summary
                </h2>

              </div>

              <div
                className={`result-badge ${
                  result.passed
                    ? "pass"
                    : "fail"
                }`}
              >
                {result.passed
                  ? "✓ PASS"
                  : "✕ FAIL"}
              </div>

            </div>

            {/* STUDENT SUMMARY */}
            <div className="student-summary">

              <div>

                <span>
                  Student
                </span>

                <strong>
                  {student.name}
                </strong>

              </div>

              <div>

                <span>
                  Roll No.
                </span>

                <strong>
                  {student.rollNo}
                </strong>

              </div>

              <div>

                <span>
                  Course
                </span>

                <strong>
                  {student.course}
                </strong>

              </div>

            </div>

            {/* SCORE OVERVIEW */}
            <div className="score-overview">

              <div className="score-main">

                <span>
                  Overall Percentage
                </span>

                <strong>
                  {result.percentage.toFixed(2)}%
                </strong>

              </div>

              <div className="total-score">

                <span>
                  Total Marks
                </span>

                <strong>
                  {result.totalMarks}

                  <small>
                    {" "}
                    / {result.maxMarks}
                  </small>

                </strong>

              </div>

            </div>

            {/* PROGRESS BAR */}
            <div className="progress-container">

              <div
                className="progress-bar"
                style={{
                  width: `${result.percentage}%`,
                }}
              ></div>

            </div>

            {/* MARKS TABLE */}
            <div className="result-table">

              <div className="table-header">

                <span>
                  Subject
                </span>

                <span>
                  Internal
                </span>

                <span>
                  External
                </span>

                <span>
                  Total
                </span>

              </div>

              {result.subjectResults.map(
                (item) => (

                  <div
                    className="table-row"
                    key={item.subject}
                  >

                    <span>
                      {item.subject}
                    </span>

                    <span>
                      {item.internal}
                    </span>

                    <span>
                      {item.external}
                    </span>

                    <strong>
                      {item.total}
                    </strong>

                  </div>

                )
              )}

            </div>

            {/* RESULT MESSAGE */}
            <div
              className={`result-message ${
                result.passed
                  ? "success"
                  : "danger"
              }`}
            >

              <span>
                {result.passed
                  ? "🎉"
                  : "⚠️"}
              </span>

              <div>

                <strong>

                  {result.passed
                    ? "Excellent! Student has passed."
                    : "Student has not passed."}

                </strong>

                <p>

                  {result.passed
                    ? "All subjects meet the minimum passing requirement of 40 marks."
                    : "One or more subjects are below the minimum passing requirement of 40 marks."}

                </p>

              </div>

            </div>

          </section>

        )}

      </main>

      {/* FOOTER */}
      <footer>

        <p>
          Student Marks Calculator • React Application
        </p>

        <p>
          Misbah Shaikh
          <span>•</span>
          PRN: 12414009
        </p>

      </footer>

    </div>
  );
}

export default App;