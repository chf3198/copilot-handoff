# Research & Design Pivot

## Date: January 27, 2026

## Initial Approach (Time-Based Tracking)
**Hypothesis:** Long chat sessions degrade over time, requiring periodic handoffs.
**Implementation:** Track session duration, alert at 30-minute threshold.
**Status:** ❌ Fundamentally flawed assumption

## Critical Insight
Time is **not** the cause of context degradation. A 3-hour session with 5 prompts is fine; a 30-minute session with 50 complex prompts needs handoff.

## Actual Problem
Context degradation in Copilot Chat is caused by:
- **Token/context window limits** - AI models have finite memory
- **Message volume** - Number of exchanges, not duration
- **Topic drift** - Switching between unrelated tasks
- **AI memory saturation** - Earlier context gets dropped
- **Complexity accumulation** - Deep multi-turn reasoning chains

---

## Research Findings

### 1. VS Code Chat API Capabilities ✅

**What Extensions CAN Access:**
- ✅ **Chat history**: `ChatContext.history` provides `ReadonlyArray<ChatRequestTurn | ChatResponseTurn>`
  - Only messages where the participant was @-mentioned
  - Each turn includes request/response content
- ✅ **Token usage data**: `ChatResult.usage` interface:
  ```typescript
  interface ChatResultUsage {
    promptTokens: number;
    completionTokens: number;
    promptTokenDetails?: readonly ChatResultPromptTokenDetail[];
  }
  ```
- ✅ **Context window limits**: `LanguageModelChatMetadata.maxInputTokens` via `ILanguageModelsService`
- ✅ **Real-time tracking**: VS Code has **built-in** `ChatContextUsageWidget` showing token percentage!

**What Extensions CANNOT Access:**
- ❌ Full Copilot Chat history (only participant-specific messages)
- ❌ Direct access to Copilot's chat state without creating a participant
- ❌ Background monitoring of arbitrary chat sessions

**Critical Discovery:** VS Code **already tracks context window usage** with visual indicators:
- `ChatContextUsageWidget`: Circular progress icon with token percentage
- `ChatContextUsageDetails`: Breakdown by category (workspace context, user input, response)
- Built-in warnings when approaching limits

### 2. Architectural Constraints

**Problem:** Cannot monitor Copilot Chat passively - must create a chat participant.
- Chat participants only see history when @-mentioned
- Extension would need @-mention in every conversation to track
- This fundamentally changes UX (users must remember `@copilot-handoff`)

**Viable Approaches:**

**A. Chat Participant with On-Demand Analysis (RECOMMENDED)**
- Create `@handoff` participant users invoke when ready
- Analyzes conversation history at that moment
- Generates context export based on actual chat state
- **Pros:** Access to real token usage, message history, intelligent recommendations
- **Cons:** Requires explicit user action, not automatic

**B. Workspace Activity Tracking (Current - Limited Value)**
- Track editor activity as proxy for complexity
- Cannot see actual chat messages or token usage
- **Pros:** Works in background
- **Cons:** Disconnected from actual context degradation

**C. Hybrid Approach**
- Passive editor tracking for basic hints
- Chat participant for deep analysis when user requests
- Status bar estimates complexity, clicking opens `@handoff` for analysis
- **Pros:** Best of both worlds
- **Cons:** More complex implementation, still limited passive insight

### 3. Correct Metrics for Context Degradation

**Primary Metrics** (via chat participant):
1. **Context Window Percentage**: `(promptTokens / maxInputTokens) * 100`
   - Already calculated by VS Code built-in widgets
   - Direct measure of model capacity usage
   - **Thresholds:** Warn at 70-80%, urgent at 90%+

2. **Turn Count**: Number of request/response pairs in `context.history`
   - Simple but effective proxy
   - **Thresholds:** ~20-30 turns before noticeable degradation

**Secondary Metrics:**
3. **Topic Diversity**: Count distinct domains referenced
   - File paths, languages, frameworks mentioned
   - More diversity = higher confusion risk

4. **Clarification Frequency**: Detect when user corrects/re-explains
   - "No, I meant..." patterns
   - "Like I said earlier..." references back
   - Indicates model losing context

**Tertiary Indicators:**
5. **Code Reference Breadth**: Number of unique files/symbols discussed
6. **Response Quality Signals**: Error corrections, hallucination patterns

### 4. User Experience Patterns

**When Users Notice Context Degradation:**
- Model references wrong files from earlier in conversation
- Suggests solutions already tried and rejected
- "Forgets" constraints or requirements established early on
- Starts contradicting previous recommendations
- Requires re-explaining foundational decisions

**Current User Workarounds:**
- Manually start new chats when feeling "stuck"
- Copy important decisions into separate notes
- Use new chat sessions for different tasks
- Restart after major topic shifts

---

## Key Decision: Architecture

### The Reality Check
**VS Code already has context usage tracking built-in.** The `ChatContextUsageWidget` and `ChatContextUsageDetails` components provide:
- Real-time token usage percentages
- Category breakdowns (workspace, user input, etc.)
- Visual warnings as limits approach

**Our extension can add value by:**
1. **Generating structured handoff documents** (already implemented in `contextExporter.ts`)
2. **Analyzing conversation patterns** for degradation signals beyond just tokens
3. **Providing proactive guidance** on when to handoff and what to include

### Recommended Approach: Chat Participant

**Implementation Plan:**
```
@handoff participant provides:
├── On-demand conversation analysis
│   ├── Read context.history for message log
│   ├── Check ChatResult.usage.promptTokens vs maxInputTokens
│   ├── Count turns, identify topics, assess complexity
│   └── Calculate degradation risk score
│
├── Smart context export
│   ├── Leverages existing contextExporter.ts template
│   ├── Auto-populates from chat history
│   ├── Highlights high-risk areas (topic drift, confusion signals)
│   └── Suggests focus areas for handoff
│
└── Proactive suggestions
    ├── "Your context window is at 85%, consider a handoff"
    ├── "Topic drift detected (3 unrelated domains), recommend fresh start"
    └── "20+ turns on complex topic, quality may degrade"
```

**Why This Works:**
- Access to actual token usage via `ChatResult.usage`
- Can read real chat messages via `context.history`
- Leverages VS Code's existing infrastructure
- User-initiated = no background permissions needed
- Can provide truly intelligent recommendations

**What We Lose:**
- Cannot monitor passively in background
- User must remember to invoke `@handoff`
- Only sees history when mentioned

**What We Keep:**
- All existing context export functionality
- Smart document generation capabilities
- Can still use workspace analysis (for what files are open, etc.)

---

## Lessons Learned
1. ✅ **Validate assumptions early**: Should have researched Chat API before building time tracker
2. ✅ **Duration ≠ Degradation**: Time is weak proxy at best
3. ✅ **UAT reveals what tests can't**: User insight exposed fundamental flaw
4. ✅ **Check what exists first**: VS Code already has token tracking widgets
5. ✅ **API constraints shape architecture**: Chat participant model is required for chat access

## Next Steps
1. ✅ Document pivot (this file)
2. ✅ Research Copilot Chat technical constraints
3. ✅ Study VS Code Chat API capabilities  
4. ✅ Identify correct metrics
5. **→ Make architectural decision: Chat participant approach**
6. ⏸️ Prototype `@handoff` chat participant
7. ⏸️ Integrate with existing contextExporter
8. ⏸️ User testing with real conversation analysis
9. ⏸️ Publish v2.0.0 with correct approach
