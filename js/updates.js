const updatesData = {
  featured: {
    tag: "Milestone",
    date: "Oct 24, 2026",
    title: "Sprint 4 Completed",
    description:
      "We have successfully completed the design phase and have moved into development. All core UI components have been approved."
  },

  currentStatus: {
    label: "On Track",
    updatedText: "Last updated today"
  },

  nextMilestone: {
    date: "Nov 15, 2026",
    title: "Beta Release",
    description: "Internal testing environment deployed for stakeholder review.",
    progress: 65
  },

  latestDocument: {
    name: "Sprint_4_Report.pdf",
    meta: "2.4 MB • Uploaded Oct 24"
  },

  thisWeek: [
    {
      title: "API Integration Started",
      category: "Development",
      status: "On Track",
      time: "2 days ago",
      description:
        "Backend team has begun connecting the frontend components to the staging API endpoints. This is progressing slightly ahead of schedule."
    },
    {
      title: "Design Review: User Dashboard",
      category: "Design",
      status: "Action Required",
      time: "1 week ago",
      description:
        "Please review the latest mockups for the user dashboard. Feedback required by Friday to maintain the development schedule."
    },
    {
      title: "User Testing Completed",
      category: "Research",
      status: "Completed",
      time: "3 days ago",
      description:
        "Usability testing sessions finished. Key insights were collected to improve the user experience and support the next design iteration."
    }
  ],

  lastWeek: [
    {
      title: "Sprint 3 Completed",
      category: "Milestone",
      status: "Completed",
      time: "Sep 28, 2026",
      description:
        "Authentication flow and basic profile management features are now functional in the staging environment. Ready for internal testing."
    }
  ]
};

const searchInput = document.getElementById("searchInput");
const sectionBlocks = document.querySelectorAll(".timeline-section");
const thisWeekTimeline = document.getElementById("thisWeekTimeline");
const lastWeekTimeline = document.getElementById("lastWeekTimeline");

const featuredTag = document.getElementById("featuredTag");
const featuredDate = document.getElementById("featuredDate");
const featuredTitle = document.getElementById("featuredTitle");
const featuredDescription = document.getElementById("featuredDescription");

const currentStatus = document.getElementById("currentStatus");
const statusUpdatedText = document.getElementById("statusUpdatedText");

const milestoneDate = document.getElementById("milestoneDate");
const milestoneTitle = document.getElementById("milestoneTitle");
const milestoneDescription = document.getElementById("milestoneDescription");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const latestDocumentName = document.getElementById("latestDocumentName");
const latestDocumentMeta = document.getElementById("latestDocumentMeta");

function getStatusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function createUpdateCard(update) {
  return `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="update-card">
        <div class="card-header">
          <h3>${update.title}</h3>
          <span class="time-text">${update.time}</span>
        </div>
        <div class="mini-tags">
          <span class="mini-tag">${update.category}</span>
          <span class="status ${getStatusClass(update.status)}">● ${update.status}</span>
        </div>
        <p>${update.description}</p>
      </div>
    </div>
  `;
}

function renderFeaturedCard() {
  featuredTag.textContent = updatesData.featured.tag;
  featuredDate.textContent = updatesData.featured.date;
  featuredTitle.textContent = updatesData.featured.title;
  featuredDescription.textContent = updatesData.featured.description;
}

function renderSidebar() {
  currentStatus.textContent = updatesData.currentStatus.label;
  statusUpdatedText.textContent = updatesData.currentStatus.updatedText;

  milestoneDate.textContent = updatesData.nextMilestone.date;
  milestoneTitle.textContent = updatesData.nextMilestone.title;
  milestoneDescription.textContent = updatesData.nextMilestone.description;

  progressFill.setAttribute("data-progress", updatesData.nextMilestone.progress);
  progressFill.style.width = updatesData.nextMilestone.progress + "%";
  progressText.textContent = `${updatesData.nextMilestone.progress}% complete`;

  latestDocumentName.textContent = updatesData.latestDocument.name;
  latestDocumentMeta.textContent = updatesData.latestDocument.meta;
}

function renderUpdates() {
  thisWeekTimeline.innerHTML = updatesData.thisWeek.map(createUpdateCard).join("");
  lastWeekTimeline.innerHTML = updatesData.lastWeek.map(createUpdateCard).join("");
}

function setupSearch() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase().trim();

    timelineItems.forEach((item) => {
      const cardText = item.textContent.toLowerCase();
      item.style.display = cardText.includes(searchValue) ? "block" : "none";
    });

    sectionBlocks.forEach((section) => {
      const itemsInSection = section.querySelectorAll(".timeline-item");
      let hasVisibleItem = false;

      itemsInSection.forEach((item) => {
        if (item.style.display !== "none") {
          hasVisibleItem = true;
        }
      });

      section.style.display = hasVisibleItem ? "block" : "none";
    });
  });
}

renderFeaturedCard();
renderSidebar();
renderUpdates();
setupSearch();