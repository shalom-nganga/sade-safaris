import { useState, useEffect } from 'react';
import { getMessages, markMessageRead, replyToMessage, deleteMessage } from '../../store';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const [reply, setReply] = useState('');
  const [replySent, setReplySent] = useState(false);

  useEffect(() => {
  async function load() {
    setMessages(await getMessages());
  }
  load();
}, []);

const refresh = async () => setMessages(await getMessages());

const handleSelect = async (id) => {
  setSelected(id);
  setReply('');
  setReplySent(false);
  await markMessageRead(id);
  refresh();
};

const handleReply = async () => {
  if (!reply.trim()) return;
  await replyToMessage(selected, reply);
  setReplySent(true);
  refresh();
};

const handleDelete = async (id) => {
  await deleteMessage(id);
  setSelected(null);
  refresh();
};

  const unread = messages.filter(m => m.status === 'Unread').length;
  const filtered = filter === 'All' ? messages : messages.filter(m => m.type === filter || m.service === filter);
  const active = messages.find(m => m.id === selected);

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Messages', value: messages.length, color: '#1a56db' },
          { label: 'Unread', value: messages.filter(m => m.status === 'Unread').length, color: '#ef4444' },
          { label: 'Replied', value: messages.filter(m => m.status === 'Replied').length, color: '#4a9c2f' },
          { label: 'Safari Enquiries', value: messages.filter(m => m.type === 'Safari').length, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', borderRadius: '10px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px', height: 'calc(100vh - 280px)' }}>

        {/* Message list */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'Safari', 'Car Hire'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '6px 14px', fontSize: '11px', fontWeight: 700,
                  borderRadius: '20px', cursor: 'pointer', fontFamily: 'inherit', border: '1.5px solid',
                  background: filter === f ? '#1a56db' : 'white',
                  color: filter === f ? 'white' : '#555',
                  borderColor: filter === f ? '#1a56db' : '#e2e8f0',
                }}>{f}</button>
              ))}
              {unread > 0 && (
                <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '20px' }}>
                  {unread} new
                </span>
              )}
            </div>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No messages found</div>
            ) : filtered.map(msg => (
              <div key={msg.id} onClick={() => handleSelect(msg.id)} style={{
                padding: '16px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer',
                background: selected === msg.id ? '#f0f4ff' : msg.status === 'Unread' ? '#fffbeb' : 'white',
                borderLeft: selected === msg.id ? '3px solid #1a56db' : '3px solid transparent',
                transition: 'all .15s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div style={{ fontWeight: msg.status === 'Unread' ? 800 : 600, fontSize: '13px', color: '#1a1a2e' }}>{msg.name}</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '8px' }}>{msg.created_at}</div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.subject}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.message}</div>
                <div style={{ marginTop: '6px', display: 'flex', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: msg.type === 'Safari' ? '#eaf5e3' : '#eff6ff', color: msg.type === 'Safari' ? '#4a9c2f' : '#1a56db' }}>
                    {msg.type === 'Safari' ? '🦁' : '🚗'} {msg.type}
                  </span>
                  {msg.status === 'Unread' && <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '20px', background: '#fef9c3', color: '#854d0e' }}>NEW</span>}
                  {msg.status === 'Replied' && <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '20px', background: '#eaf5e3', color: '#4a9c2f' }}>REPLIED</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message detail */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {active ? (
            <>
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1a1a2e' }}>{active.subject}</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', background: active.type === 'Safari' ? '#eaf5e3' : '#eff6ff', color: active.type === 'Safari' ? '#4a9c2f' : '#1a56db' }}>
                      {active.type === 'Safari' ? '🦁' : '🚗'} {active.type}
                    </span>
                    <button
                      onClick={() => handleDelete(active.id)}
                      style={{ padding: '4px 12px', fontSize: '11px', fontWeight: 700, background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '20px', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '13px' }}><span style={{ color: '#94a3b8' }}>From: </span><strong style={{ color: '#1a1a2e' }}>{active.name}</strong></div>
                  <div style={{ fontSize: '13px' }}><span style={{ color: '#94a3b8' }}>Email: </span><span style={{ color: '#1a56db' }}>{active.email}</span></div>
                  <div style={{ fontSize: '13px' }}><span style={{ color: '#94a3b8' }}>Phone: </span><span style={{ color: '#475569' }}>{active.phone}</span></div>
                  <div style={{ fontSize: '13px' }}><span style={{ color: '#94a3b8' }}>Date: </span><span style={{ color: '#475569' }}>{active.created_at}</span></div>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
                {/* Message */}
                <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '20px', fontSize: '14px', color: '#475569', lineHeight: 1.8, marginBottom: '24px' }}>
                  {active.message}
                </div>

                {/* Previous reply */}
                {active.reply && (
                  <div style={{ background: '#eaf5e3', borderRadius: '10px', padding: '20px', fontSize: '14px', color: '#2d6a1a', lineHeight: 1.8, marginBottom: '24px', borderLeft: '4px solid #4a9c2f' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#4a9c2f', marginBottom: '8px', letterSpacing: '1px' }}>YOUR REPLY</div>
                    {active.reply}
                  </div>
                )}

                {/* Reply box */}
                {replySent ? (
                  <div style={{ background: '#eaf5e3', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
                    <div style={{ fontWeight: 700, color: '#4a9c2f', fontSize: '14px' }}>Reply saved successfully!</div>
                    <button onClick={() => { setReplySent(false); setReply(''); }} style={{ marginTop: '12px', background: 'none', border: 'none', color: '#1a56db', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>
                      Write another reply
                    </button>
                  </div>
                ) : (
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                      {active.reply ? 'UPDATE REPLY' : 'WRITE A REPLY'}
                    </label>
                    <textarea
                      rows={4}
                      value={reply}
                      onChange={e => setReply(e.target.value)}
                      placeholder="Type your reply..."
                      style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '12px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                      onFocus={e => e.target.style.borderColor = '#1a56db'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                      <button
                        onClick={handleReply}
                        style={{ background: '#1a56db', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        📧 Save Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#94a3b8' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>✉️</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Select a message to read</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminMessages;