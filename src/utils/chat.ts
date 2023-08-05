import { html, TemplateResult } from 'lit';
import * as api from '../utils/api';
import logging from './logging';
import global from '../utils/global';

export interface ChatMsgCtx {
	isPartyLeader: boolean;
	actions: {
		joinParty: (token: string) => Promise<void>;
		inviteToParty: (identityId: string) => Promise<void>;
	};
}

export function getMessageBody(message: api.chat.ChatMessage, ctx?: ChatMsgCtx) {
	// Match the message kind
	/* if (message.body.kind.kind == "Custom") {
		let body = message.body.kind.content;
		return html`<div class='identity'><identity-avatar .identity=${body.identity}></identity-avatar><identity-name .identity=${body.sender}></identity-name></div> sent an unsupported message.`;
	} else */
	if (message.body.text) {
		let body = message.body.text;

		return body.body;
	} else if (message.body.chatCreate) {
		return html`Chat created`;
	} else if (message.body.deleted) {
		// let body = message.body.deleted;
		return 'message deleted';
	} else if (message.body.identityFollow) {
		let body = message.body.identityFollow;
		// return html`<div class='identity'><identity-avatar .identity=${body.identity}></identity-avatar><identity-name .identity=${body.identity}></identity-name></div> followed you.`
		return html`TODO: Find the other identity in the chat`;
	} else if (message.body.groupJoin) {
		let body = message.body.groupJoin;
		return html`<div class="identity">
				<identity-avatar .identity=${body.identity} link></identity-avatar
				><identity-name .identity=${body.identity}></identity-name>
			</div>
			joined the group.`;
	} else if (message.body.groupLeave) {
		let body = message.body.groupLeave;
		return html`<div class="identity">
				<identity-avatar .identity=${body.identity} link></identity-avatar
				><identity-name .identity=${body.identity}></identity-name>
			</div>
			left the group.`;
	} else if (message.body.groupMemberKick) {
		let body = message.body.groupMemberKick;
		return html`<div class="identity">
				<identity-avatar .identity=${body.identity} link></identity-avatar
				><identity-name .identity=${body.identity}></identity-name>
			</div>
			was kicked from the group.`;
	} else if (message.body.partyJoin) {
		let body = message.body.partyJoin;
		return html`<div class="identity">
				<identity-avatar .identity=${body.identity} link></identity-avatar
				><identity-name .identity=${body.identity}></identity-name>
			</div>
			joined the party.`;
	} else if (message.body.partyLeave) {
		let body = message.body.partyLeave;
		return html`<div class="identity">
				<identity-avatar .identity=${body.identity} link></identity-avatar
				><identity-name .identity=${body.identity}></identity-name>
			</div>
			left the party.`;
	} else if (message.body.partyInvite) {
		let body = message.body.partyInvite;
		let inParty = body.party && global.currentParty && global.currentParty.partyId == body.party.partyId;

		return html`<div class="party-invite" expired=${!body.party || !body.inviteToken}>
			Party invite from
			<div class="identity">
				<identity-avatar .identity=${body.sender} link></identity-avatar>
				<identity-name .identity=${body.sender}></identity-name>
			</div>
			${!body.party || !body.inviteToken
				? 'expired.'
				: inParty
				? body.sender.identityId == global.currentIdentity.identityId
					? null
					: 'accepted.'
				: body.party && ctx
				? html`<rvt-button .trigger=${() => ctx.actions.joinParty(body.inviteToken)}
						>Accept</rvt-button
				  >`
				: null}
		</div>`;
	} else if (message.body.partyJoinRequest) {
		let body = message.body.partyJoinRequest;
		let isSelf = body.sender.identityId == global.currentIdentity.identityId;

		if (isSelf) {
			return html`<div class="party-join-request">
				You requested to join
				<div class="identity">
					<identity-avatar .identity=${body.sender} link></identity-avatar>
					<identity-name .identity=${body.sender}></identity-name>
				</div>
				's party.
			</div>`;
		} else {
			return html`<div class="party-join-request">
				<div class="identity">
					<identity-avatar .identity=${body.sender} link></identity-avatar>
					<identity-name .identity=${body.sender}></identity-name>
				</div>
				requested to join ${ctx && ctx.isPartyLeader ? 'your' : 'the'} party.
				${ctx && ctx.isPartyLeader
					? html`<rvt-button
							small
							.trigger=${() => ctx.actions.inviteToParty(body.sender.identityId)}
							>Invite</rvt-button
					  >`
					: null}
			</div>`;
		}
	} else if (message.body.partyActivityChange) {
		let body = message.body.partyActivityChange;

		// TODO: Add back
		// Render event message
		// let event: TemplateResult;
		// if (body.activity.activity != null) {
		// 	// Activity exists
		// 	if (body.activity.activity.kind == "Game") {
		// 		let activityKind = body.activity.activity.content as client.party.GameActivity;
		// 		let gameHref = routes.game.build({ nameId: activityKind.game.nameId });
		// 		event = html`Party is now playing <a href=${gameHref}>${activityKind.game.displayName}</a>.`;
		// 	} else {
		// 		logging.warn("Unknown activity kind", body.activity.activity.kind);
		// 		event = html`?`;
		// 	}
		// } else {
		// 	// No activity
		// 	event = html`Party is now idle.`;
		// }
		//
		// return event;

		return html`TODO`;
	} else {
		logging.warn('unknown message kind', (message.body as any).kind);
		return null;
	}
}

export namespace lexer {
	class Segment {
		startIndex: number;
		endIndex: number = null;
		children: Segment[] = [];
		syntax: Syntax;

		constructor(startIndex: number, syntax: Syntax) {
			this.startIndex = startIndex;
			this.syntax = syntax;
		}

		render(content: string): TemplateResult | TemplateResult[] | string {
			let startIndex = this.startIndex + this.syntax.start.length;
			let endIndex = this.endIndex;
			if (this.syntax.end) endIndex -= this.syntax.end.length;
			else if (this.syntax.matchType == SyntaxMatchType.EndOfLine) endIndex -= 1;

			// Converts all empty space between children into `StringSegment`s
			for (let i = this.children.length; i >= 0; i--) {
				let child = this.children[i];
				let index = child ? child.startIndex - 1 : endIndex;
				let nextChild = this.children[i - 1];
				let nextIndex = nextChild ? nextChild.endIndex + 1 : startIndex;

				if (nextIndex != index + 1) {
					this.children.splice(i, 0, new StringSegment(nextIndex, index));
				}
			}

			// No children, add single string segment
			if (!this.children.length) this.children.push(new StringSegment(startIndex, endIndex));

			return this.syntax.render(content, this);
		}

		// Shorthand function
		renderChildren(content: string) {
			return this.children.map(c => c.render(content));
		}
	}

	// Decorator class for the purpose of consistency
	class StringSegment extends Segment {
		constructor(startIndex: number, endIndex: number) {
			super(startIndex, null);
			this.endIndex = endIndex;
		}

		render(content: string) {
			return content.slice(this.startIndex, this.endIndex + 1);
		}
	}

	enum SyntaxMatchType {
		Standard,
		SingleCharacter,
		EndOfLine
	}

	interface SyntaxOptions {
		start: string;
		end?: string;
		matchType?: SyntaxMatchType;
		render: (content: string, segment: Segment) => TemplateResult | TemplateResult[] | string;
	}

	class Syntax {
		start: string;
		end: string = null;
		matchType: SyntaxMatchType;
		render: (content: string, segment: Segment) => TemplateResult | TemplateResult[] | string;

		allowedNesting: Syntax[] = [];

		constructor(opts: SyntaxOptions) {
			this.start = opts.start;
			this.end = opts.end;
			this.matchType = opts.matchType ?? SyntaxMatchType.Standard;
			this.render = opts.render;
		}

		// Test if the given `start` substring is present in the next characters at the current index
		peekStart(content: string, i: number) {
			let failed = false;
			for (let j = 0, l2 = this.start.length; j < l2; j++) {
				if (content[i + j] != this.start[j]) {
					failed = true;
					break;
				}
			}

			return !failed;
		}

		// Test if the given `end` substring is present in the next characters at the current index
		peekEnd(content: string, i: number) {
			let failed = false;
			for (let j = 0, l2 = this.end.length; j < l2; j++) {
				if (content[i + j] != this.end[j]) {
					failed = true;
					break;
				}
			}

			return !failed;
		}

		allow(...syntaxes: Syntax[]) {
			this.allowedNesting.push(...syntaxes);
		}

		// Check if the given syntax can be nested in this one
		allowed(syntax: Syntax) {
			return this.allowedNesting.indexOf(syntax) != -1;
		}
	}

	export function lex(content: string, syntaxes: Syntax[]) {
		let segments: Segment[] = [];
		let segmentStack: Segment[] = [];

		let i = 0;
		let safety = 0;
		while (i < content.length) {
			if (safety++ >= 10000) throw new Error('rich text lexer derailed');

			// Latest segment
			let activeSegment = segmentStack[segmentStack.length - 1];
			let segmentCompleted = false;

			if (activeSegment) {
				// True when the lexer is currently on the character directly after this segment's start
				// clause
				let justAfterStart = i == activeSegment.startIndex + activeSegment.syntax.start.length;

				if (activeSegment.syntax.end) {
					segmentCompleted = !justAfterStart && activeSegment.syntax.peekEnd(content, i);
				} else if (activeSegment.syntax.matchType == SyntaxMatchType.SingleCharacter) {
					segmentCompleted = true;
				} else if (activeSegment.syntax.matchType == SyntaxMatchType.EndOfLine) {
					segmentCompleted = !justAfterStart && content[i] == '\n';
				}

				// NOTE: We use a while loop here instead of an if statement to recursively collapse
				// `EndOfLine` syntaxes
				let completed = segmentCompleted;
				while (completed) {
					// Segment was completed, remove from stack
					let activeSegment = segmentStack.pop();

					let endWidth = activeSegment.syntax.end ? activeSegment.syntax.end.length : 1;
					activeSegment.endIndex = i + endWidth - 1;

					// If the stack is not empty, insert into the next latest segment
					if (segmentStack.length) {
						segmentStack[segmentStack.length - 1].children.push(activeSegment);
					}
					// Insert segment into root segment list
					else {
						segments.push(activeSegment);
					}

					// Increment index by the length of the segment that just completed
					i += endWidth;

					// Stop loop if not `EndOfLine` syntax
					let lastSegment = segmentStack[segmentStack.length - 1];
					completed =
						activeSegment.syntax.matchType == SyntaxMatchType.EndOfLine &&
						lastSegment?.syntax.matchType == SyntaxMatchType.EndOfLine;
				}
			}

			if (!segmentCompleted) {
				let potentialMatches = [];

				// Check for new potential segments
				for (let syntax of syntaxes) {
					if (activeSegment && !activeSegment.syntax.allowed(syntax)) continue;

					if (syntax.peekStart(content, i)) {
						potentialMatches.push(new Segment(i, syntax));
					}
				}

				// Add longest segment (by `start` string length) to the end of the stack
				if (potentialMatches.length) {
					let longest = potentialMatches.reduce(
						(s, a) => (a.syntax.start.length > s.syntax.start.length ? a : s),
						potentialMatches[0]
					);

					segmentStack.push(longest);
					i += longest.syntax.start.length;
				}
				// No potential matches, increment normally
				else {
					i++;
				}
			}
		}

		// Check for any latent `EndOfLine` and `SingleCharacter` syntax segments and complete them
		let last;
		while (
			((last = segmentStack[segmentStack.length - 1]),
			last?.syntax.matchType == SyntaxMatchType.EndOfLine ||
				last?.syntax.matchType == SyntaxMatchType.SingleCharacter)
		) {
			// Segment was completed, remove from stack
			let activeSegment = segmentStack.pop();

			if (activeSegment.syntax.matchType == SyntaxMatchType.EndOfLine) {
				let endWidth = activeSegment.syntax.end ? activeSegment.syntax.end.length : 1;
				activeSegment.endIndex = i + endWidth - 1;

				// If the stack is not empty, insert into the next latest segment
				if (segmentStack.length) {
					segmentStack[segmentStack.length - 1].children.push(activeSegment);
				}
				// Insert segment into root segment list
				else {
					segments.push(activeSegment);
				}
			} else {
				// Any incomplete single character syntaxes that are present at the end of the content string
				// can be skipped
			}
		}

		let globalSegment = new Segment(0, GLOBAL);
		globalSegment.endIndex = content.length - 1;
		globalSegment.children = segments;

		return globalSegment;
	}

	// === SYNTAX DEFINITIONS ===

	// NOTE: This is not an actual syntax we match with, its used to make rendering easier (see above)
	const GLOBAL = new Syntax({
		start: '',
		end: '',
		render: (c, s) => s.renderChildren(c) as TemplateResult[]
	});
	const ESCAPE = new Syntax({
		start: '\\',
		matchType: SyntaxMatchType.SingleCharacter,
		render: (c, s) => s.renderChildren(c) as TemplateResult[]
	});
	const BOLD = new Syntax({
		start: '**',
		end: '**',
		render: (c, s) => html`<b>${s.renderChildren(c)}</b>`
	});
	const EMPHASIS = new Syntax({
		start: '*',
		end: '*',
		render: (c, s) => html`<em>${s.renderChildren(c)}</em>`
	});
	const QUOTE = new Syntax({
		start: '>',
		matchType: SyntaxMatchType.EndOfLine,
		render: (c, s) =>
			html`<div class="block-quote">
				<div class="block-quote-border"></div>
				<div class="block-quote-content">
					<blockquote>${s.renderChildren(c)}</blockquote>
				</div>
			</div>`
	});
	const INLINE_CODE = new Syntax({
		start: '`',
		end: '`',
		render: (c, s) => html`<code>${s.renderChildren(c)}</code>`
	});
	const CODE = new Syntax({
		start: '```',
		end: '```',
		render: (c, s) => {
			// Remove first and last newline inside the code block (if exists)
			if (s.children.length == 1) {
				let child = s.children[0];
				if (child instanceof StringSegment) {
					if (c[child.startIndex] == '\n') child.startIndex += 1;
					if (c[child.endIndex] == '\n') child.endIndex -= 1;
				}
			} else {
				let firstChild = s.children[0];
				let lastChild = s.children[s.children.length - 1];

				if (firstChild instanceof StringSegment) {
					if (c[firstChild.startIndex] == '\n') firstChild.startIndex += 1;
				} else if (s.children.length != 1 && lastChild instanceof StringSegment) {
					if (c[lastChild.endIndex] == '\n') lastChild.endIndex -= 1;
				}
			}

			return html`<code>${s.renderChildren(c)}</code>`;
		}
	});

	// Establish nesting
	BOLD.allow(ESCAPE, EMPHASIS, INLINE_CODE, CODE);
	EMPHASIS.allow(ESCAPE, INLINE_CODE, CODE);
	QUOTE.allow(ESCAPE, BOLD, EMPHASIS, QUOTE, INLINE_CODE, CODE);
	INLINE_CODE.allow(ESCAPE);
	CODE.allow(ESCAPE);

	export const ROOT_SYNTAXES = [ESCAPE, BOLD, EMPHASIS, QUOTE, INLINE_CODE, CODE];
	export const SIMPLE_SYNTAXES = [ESCAPE, BOLD, EMPHASIS, INLINE_CODE];
}

// Test function
// function html(templates, ...data) {
// 	let s = '';

// 	for(let i = 0, l = templates.length; i < l; i ++) {
// 		s += templates[i];
// 		if(i < data.length) s += data[i] instanceof Array ? data[i].join('') : data[i];
// 	}

// 	return s;
// }
