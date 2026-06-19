// assets/content-map.js – 站点内容分区与标签配置，含简单搜索过滤函数

const contentMap = {
  siteUrl: "https://cn-mjhu.com",
  primaryKeyword: "麻将胡了",
  sections: [
    {
      id: "home",
      title: "首页",
      tags: ["首页", "推荐", "麻将胡了"],
      items: [
        { name: "最新公告", url: "/news", keywords: ["公告", "新闻", "麻将胡了"] },
        { name: "热门活动", url: "/events", keywords: ["活动", "促销", "麻将胡了"] }
      ]
    },
    {
      id: "game-intro",
      title: "游戏介绍",
      tags: ["玩法", "规则", "麻将胡了"],
      items: [
        { name: "基本规则", url: "/rules", keywords: ["规则", "基础", "麻将胡了"] },
        { name: "特殊牌型", url: "/special", keywords: ["牌型", "特殊", "麻将胡了"] }
      ]
    },
    {
      id: "strategy",
      title: "策略技巧",
      tags: ["技巧", "策略", "麻将胡了"],
      items: [
        { name: "新手入门", url: "/beginner", keywords: ["新手", "入门", "麻将胡了"] },
        { name: "高级技巧", url: "/advanced", keywords: ["高级", "技巧", "麻将胡了"] }
      ]
    },
    {
      id: "community",
      title: "玩家社区",
      tags: ["社区", "论坛", "麻将胡了"],
      items: [
        { name: "讨论区", url: "/forum", keywords: ["讨论", "交流", "麻将胡了"] },
        { name: "排行榜", url: "/ranking", keywords: ["排行", "积分", "麻将胡了"] }
      ]
    },
    {
      id: "support",
      title: "客服支持",
      tags: ["帮助", "客服", "麻将胡了"],
      items: [
        { name: "常见问题", url: "/faq", keywords: ["问题", "FAQ", "麻将胡了"] },
        { name: "联系我们", url: "/contact", keywords: ["联系", "反馈", "麻将胡了"] }
      ]
    }
  ]
};

/**
 * 根据关键词搜索匹配的内容项
 * @param {string} query - 搜索关键词
 * @param {object} map - 内容映射对象，默认 contentMap
 * @returns {Array} 匹配的内容项数组
 */
function searchContent(query, map = contentMap) {
  if (!query || typeof query !== "string") return [];
  const lowerQuery = query.toLowerCase();
  const results = [];

  map.sections.forEach(section => {
    const sectionMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    section.items.forEach(item => {
      const keywordMatch = item.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));
      if (sectionMatch || keywordMatch) {
        results.push({
          section: section.title,
          name: item.name,
          url: item.url,
          matchType: sectionMatch ? "section" : "keyword"
        });
      }
    });
  });

  return results;
}

/**
 * 根据分区 ID 获取该分区的所有内容项
 * @param {string} sectionId - 分区标识符
 * @returns {Array|null} 内容项数组或 null
 */
function getSectionItems(sectionId) {
  const section = contentMap.sections.find(s => s.id === sectionId);
  return section ? section.items : null;
}

/**
 * 获取所有唯一标签（去重）
 * @returns {Array<string>} 标签数组
 */
function getAllTags() {
  const tagSet = new Set();
  contentMap.sections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
    section.items.forEach(item => {
      item.keywords.forEach(kw => tagSet.add(kw));
    });
  });
  return Array.from(tagSet);
}

// 示例用法（可注释掉）
// console.log(searchContent("麻将胡了"));
// console.log(getSectionItems("strategy"));
// console.log(getAllTags());